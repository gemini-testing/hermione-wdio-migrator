'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"isVisibleWithinViewport" command', () => {
    let browser, findElement, addIsVisibleWithinViewport;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addIsVisibleWithinViewport = proxyquire('lib/commands/state/isVisibleWithinViewport', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "isVisibleWithinViewport" command', () => {
        addIsVisibleWithinViewport(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'isVisibleWithinViewport', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addIsVisibleWithinViewport(browser);

        await browser.isVisibleWithinViewport('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "isDisplayedInViewport" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addIsVisibleWithinViewport(browser);

        await browser.isVisibleWithinViewport('.some-selector');

        assert.calledOnceWithExactly(element.isDisplayedInViewport);
    });
});
