'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"moveToObject" command', () => {
    let browser, findElement, getPerformActionId, addMoveToObject;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        getPerformActionId = sinon.stub().returns('some-id');

        addMoveToObject = proxyquire('lib/commands/action/moveToObject', {
            '../../helpers/findElement': findElement,
            '../../helpers/getPerformActionId': getPerformActionId
        });
    });

    afterEach(() => sinon.restore());

    it('should add "moveToObject" command', () => {
        addMoveToObject(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'moveToObject', sinon.match.func);
    });

    describe('browser does not support w3c protocol', () => {
        beforeEach(() => {
            browser.isW3C = false;
        });

        it('should get element by passed selector', async () => {
            addMoveToObject(browser);

            await browser.moveToObject('.some-selector');

            assert.calledOnceWithExactly(findElement, browser, '.some-selector');
        });

        it('should call "moveTo" on browser element with passed offset', async () => {
            const element = mkElement_();

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addMoveToObject(browser);

            await browser.moveToObject('.some-selector', 100, 200);

            assert.calledOnceWithExactly(element.moveTo, {xOffset: 100, yOffset: 200});
        });

        it('should not call "getElementRect" method', async () => {
            addMoveToObject(browser);

            await browser.moveToObject('.some-selector');

            assert.notCalled(browser.getElementRect);
        });
    });

    describe('browser support w3c protocol', () => {
        beforeEach(() => {
            browser.isW3C = true;
        });

        describe('browser runs in mobile device', () => {
            beforeEach(() => {
                browser.isMobile = true;
            });

            it('should not call "moveTo" on element or "performActions" on browser', async () => {
                const element = mkElement_();

                findElement.withArgs(browser, '.some-selector').resolves(element);
                addMoveToObject(browser);

                await browser.moveToObject('.some-selector');

                assert.notCalled(element.moveTo);
                assert.notCalled(browser.performActions);
            });

            it('should perform touch action with passed offsets', async () => {
                const element = mkElement_();

                findElement.withArgs(browser, '.some-selector').resolves(element);
                addMoveToObject(browser);

                await browser.moveToObject('.some-selector', 100, 200);

                assert.calledOnceWithExactly(element.touchAction, [
                    'press',
                    {action: 'moveTo', x: 100, y: 200},
                    'release'
                ]);
            });
        });

        describe('browser runs in desktop device', () => {
            beforeEach(() => {
                browser.isMobile = false;
            });

            it('should get element by passed selector', async () => {
                const element = mkElement_({id: 100500});
                browser.getElementRect.withArgs(100500).resolves({x: 0, y: 0, width: 10, height: 10});
                browser.execute.onFirstCall().resolves({x: 0, y: 0, width: 100, height: 100});
                findElement.withArgs(browser, '.some-selector').resolves(element);

                addMoveToObject(browser);

                await browser.moveToObject('.some-selector');

                assert.calledOnceWithExactly(findElement, browser, '.some-selector');
            });

            it('should get element and viewport rects', async () => {
                const element = mkElement_({id: 100500});
                browser.getElementRect.withArgs(100500).resolves({x: 0, y: 0, width: 10, height: 10});
                browser.execute.onFirstCall().resolves({x: 0, y: 0, width: 100, height: 100});
                findElement.withArgs(browser, '.some-selector').resolves(element);

                addMoveToObject(browser);

                await browser.moveToObject('.some-selector');

                assert.calledOnceWithExactly(browser.getElementRect, 100500);
                assert.calledOnceWithExactly(browser.execute, sinon.match.func);
            });

            describe('element is inside viewport', () => {
                let element;

                beforeEach(() => {
                    element = mkElement_({id: 100500});
                    browser.getElementRect.withArgs(100500).resolves({x: 0, y: 0, width: 10, height: 10});
                    browser.execute.onFirstCall().resolves({x: 0, y: 0, width: 100, height: 100});
                    findElement.withArgs(browser, '.some-selector').resolves(element);
                });

                it('should move to the center of the element if offset coords is not passed', async () => {
                    getPerformActionId.withArgs(browser).returns('some-pointer-id');
                    addMoveToObject(browser);

                    await browser.moveToObject('.some-selector');

                    assert.calledOnceWithExactly(browser.performActions, [{
                        type: 'pointer',
                        id: 'some-pointer-id',
                        parameters: {pointerType: 'mouse'},
                        actions: [{type: 'pointerMove', duration: 0, x: 5, y: 5}]
                    }]);
                });

                it('should move to the passed offset coords', async () => {
                    getPerformActionId.withArgs(browser).returns('some-pointer-id');
                    addMoveToObject(browser);

                    await browser.moveToObject('.some-selector', 1, 1);

                    assert.calledOnceWithExactly(browser.performActions, [{
                        type: 'pointer',
                        id: 'some-pointer-id',
                        parameters: {pointerType: 'mouse'},
                        actions: [{type: 'pointerMove', duration: 0, x: 1, y: 1}]
                    }]);
                });

                it('should not scroll into view of the element', async () => {
                    addMoveToObject(browser);

                    await browser.moveToObject('.some-selector');

                    assert.notCalled(element.scrollIntoView);
                });
            });

            describe('element is outside of the viewport', () => {
                let element;

                beforeEach(() => {
                    element = mkElement_({id: 100500});
                    browser.getElementRect.withArgs(100500).resolves({x: 10, y: 10, width: 10, height: 10});
                    browser.execute
                        .onFirstCall().resolves({x: 0, y: 0, width: 10, height: 10})
                        .onSecondCall().resolves({x: 10, y: 10, width: 10, height: 10});
                    findElement.withArgs(browser, '.some-selector').resolves(element);
                });

                it('should scroll into view of the element', async () => {
                    addMoveToObject(browser);

                    await browser.moveToObject('.some-selector');

                    assert.calledOnceWithExactly(element.scrollIntoView);
                });

                it('should move to the center of the element if offset coords is not passed', async () => {
                    getPerformActionId.withArgs(browser).returns('some-pointer-id');
                    addMoveToObject(browser);

                    await browser.moveToObject('.some-selector');

                    assert.calledOnceWithExactly(browser.performActions, [{
                        type: 'pointer',
                        id: 'some-pointer-id',
                        parameters: {pointerType: 'mouse'},
                        actions: [{type: 'pointerMove', duration: 0, x: 5, y: 5}]
                    }]);
                });

                it('should move to the passed offset coords', async () => {
                    getPerformActionId.withArgs(browser).returns('some-pointer-id');
                    addMoveToObject(browser);

                    await browser.moveToObject('.some-selector', 1, 1);

                    assert.calledOnceWithExactly(browser.performActions, [{
                        type: 'pointer',
                        id: 'some-pointer-id',
                        parameters: {pointerType: 'mouse'},
                        actions: [{type: 'pointerMove', duration: 0, x: 1, y: 1}]
                    }]);
                });
            });
        });
    });
});
