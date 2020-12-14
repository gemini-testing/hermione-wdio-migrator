'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"isVisible" command', () => {
    let browser, findElement, addIsVisible;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addIsVisible = proxyquire('lib/commands/state/isVisible', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "isVisible" command', () => {
        addIsVisible(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'isVisible', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addIsVisible(browser);

        await browser.isVisible('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "isDisplayed" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addIsVisible(browser);

        await browser.isVisible('.some-selector');

        assert.calledOnceWithExactly(element.isDisplayed);
    });
});
