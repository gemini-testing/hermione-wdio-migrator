'use strict';

const addElementIdCssProperty = require('lib/commands/protocol/elementIdCssProperty');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdCssProperty" command', () => {
    it('should add "elementIdCssProperty" command', () => {
        const browser = mkBrowser_();

        addElementIdCssProperty(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdCssProperty', sinon.match.func);
    });

    it('should call "getElementCSSValue" with passed args', async () => {
        const browser = mkBrowser_();

        addElementIdCssProperty(browser);
        await browser.elementIdCssProperty('element-id', 'some-css-property');

        assert.calledOnceWithExactly(browser.getElementCSSValue, 'element-id', 'some-css-property');
    });
});
