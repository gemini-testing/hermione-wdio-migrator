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

    it('should scroll only by coordinates if selector is not passed', async () => {
        addScroll(browser);

        await browser.scroll(100, 200);

        assert.calledOnceWithExactly(browser.touchScroll, 100, 200);
        assert.notCalled(findElement);
    });

    it('should get element by passed selector', async () => {
        addScroll(browser);

        await browser.scroll('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should scroll by passed coordinates and found element id', async () => {
        const browser = mkBrowser_();
        const element = mkElement_({id: 123});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addScroll(browser);

        await browser.scroll('.some-selector', 100, 200);

        assert.calledOnceWithExactly(browser.touchScroll, 100, 200, 123);
    });
});
