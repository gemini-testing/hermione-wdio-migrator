'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"scroll" command', () => {
    let browser, findElement, addScroll;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addScroll = proxyquire('lib/commands/utility/scroll', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "scroll" command', () => {
        addScroll(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'scroll', sinon.match.func);
    });

    describe('exec in mobile', () => {
        beforeEach(() => {
            browser.isMobile = true;
        });

        it('should scroll only by coordinates if selector is not passed', async () => {
            addScroll(browser);

            await browser.scroll(100, 200);

            assert.notCalled(findElement);
            assert.calledOnceWithExactly(browser.touchScroll, 100, 200);
        });

        it('should get element by passed selector', async () => {
            addScroll(browser);

            await browser.scroll('.some-selector');

            assert.calledOnceWithExactly(findElement, browser, '.some-selector');
        });

        it('should scroll by default coordinates and found element id', async () => {
            const element = mkElement_({id: 123});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addScroll(browser);

            await browser.scroll('.some-selector');

            assert.calledOnceWithExactly(browser.touchScroll, 0, 0, 123);
        });

        it('should scroll by passed coordinates and found element id', async () => {
            const element = mkElement_({id: 123});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addScroll(browser);

            await browser.scroll('.some-selector', 100, 200);

            assert.calledOnceWithExactly(browser.touchScroll, 100, 200, 123);
        });
    });

    describe('exec in not mobile', () => {
        beforeEach(() => {
            browser.isMobile = false;
            global.window = {
                scrollTo: sinon.stub()
            };

            browser.execute.callsFake((handler, ...args) => handler(...args));
        });

        afterEach(() => {
            global.window = undefined;
        });

        it('should scroll only by coordinates if selector is not passed', async () => {
            addScroll(browser);

            await browser.scroll(100, 200);

            assert.notCalled(findElement);
            assert.calledOnceWithExactly(browser.execute, sinon.match.func, 100, 200);
            assert.calledOnceWithExactly(global.window.scrollTo, 100, 200);
        });

        it('should get element by passed selector', async () => {
            const element = mkElement_({id: 123});
            element.getLocation.resolves({x: 100, y: 200});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addScroll(browser);

            await browser.scroll('.some-selector');

            assert.calledOnceWithExactly(findElement, browser, '.some-selector');
        });

        it('should scroll by default coordinates relative to location of found element', async () => {
            const element = mkElement_({id: 123});
            element.getLocation.resolves({x: 100, y: 200});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addScroll(browser);

            await browser.scroll('.some-selector');

            assert.calledOnceWithExactly(browser.execute, sinon.match.func, 100, 200);
            assert.calledOnceWithExactly(global.window.scrollTo, 100, 200);
        });

        it('should scroll by passed coordinates relative to location of found element', async () => {
            const element = mkElement_({id: 123});
            element.getLocation.resolves({x: 100, y: 200});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addScroll(browser);

            await browser.scroll('.some-selector', 10, 20);

            assert.calledOnceWithExactly(browser.execute, sinon.match.func, 110, 220);
            assert.calledOnceWithExactly(global.window.scrollTo, 110, 220);
        });
    });
});
