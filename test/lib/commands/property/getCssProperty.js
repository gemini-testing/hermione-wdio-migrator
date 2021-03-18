'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getCssProperty" command', () => {
    let browser, findElement, addGetCssProperty;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetCssProperty = proxyquire('lib/commands/property/getCssProperty', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getCssProperty" command', () => {
        addGetCssProperty(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getCssProperty', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetCssProperty(browser);

        await browser.getCssProperty('.some-selector', 'color');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getCSSProperty" on browser element with passed css property', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetCssProperty(browser);

        await browser.getCssProperty('.some-selector', 'color');

        assert.calledOnceWithExactly(element.getCSSProperty, 'color');
    });
});
