'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');
const {LONG_CLICK_DURATION, CLICK_DURATION} = require('../../../../lib/constants');

describe('"touch" command', () => {
    let browser, findElement, addTouch, getPerformActionId;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        getPerformActionId = sinon.stub().returns('some-id');
        addTouch = proxyquire('lib/commands/mobile/touch', {
            '../../helpers/findElement': findElement,
            '../../helpers/getPerformActionId': getPerformActionId
        });
    });

    afterEach(() => sinon.restore());

    for (const isW3C of [false, true]) {
        describe(`in${isW3C ? '' : ' non'} W3C mode`, () => {
            beforeEach(() => {
                browser.isW3C = isW3C;
            });

            it('should add "touch" command', () => {
                addTouch(browser);

                assert.calledOnceWithExactly(browser.addCommand, 'touch', sinon.match.func);
            });

            it('should get element by passed selector', async () => {
                addTouch(browser);

                await browser.touch('.some-selector');

                assert.calledOnceWithExactly(findElement, browser, '.some-selector');
            });
        });
    }

    describe('in non W3C mode', () => {
        beforeEach(() => {
            browser.isW3C = false;
        });

        it('should call "touchClick" with element id if "longClick" param is not passed', async () => {
            const element = mkElement_({id: 123});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addTouch(browser);

            await browser.touch('.some-selector');

            assert.calledOnceWithExactly(browser.touchClick, 123);
        });

        it('should call "touchLongClick" with element id if "longClick" param is passed as truthy', async () => {
            const element = mkElement_({id: 123});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addTouch(browser);

            await browser.touch('.some-selector', true);

            assert.calledOnceWithExactly(browser.touchLongClick, 123);
        });
    });

    describe('in W3C mode', () => {
        beforeEach(() => {
            browser.isW3C = true;
        });

        it('should call performActions with regular click duration', async () => {
            const element = mkElement_({id: 123});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addTouch(browser);

            await browser.touch('.some-selector');

            assert.calledOnceWithExactly(browser.performActions, [{
                type: 'pointer',
                id: 'some-id',
                parameters: {pointerType: 'touch'},
                actions: [
                    {type: 'pointerMove', duration: 0, origin: element, x: 0, y: 0},
                    {type: 'pointerDown', button: 0},
                    {type: 'pause', duration: CLICK_DURATION},
                    {type: 'pointerUp', button: 0}
                ]
            }]);
        });

        it('should call performActions with long click duration if "longClick" is set', async () => {
            const element = mkElement_({id: 123});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addTouch(browser);

            await browser.touch('.some-selector', true);

            assert.calledOnceWithExactly(browser.performActions, [{
                type: 'pointer',
                id: 'some-id',
                parameters: {pointerType: 'touch'},
                actions: [
                    {type: 'pointerMove', duration: 0, origin: element, x: 0, y: 0},
                    {type: 'pointerDown', button: 0},
                    {type: 'pause', duration: LONG_CLICK_DURATION},
                    {type: 'pointerUp', button: 0}
                ]
            }]);
        });
    });
});
