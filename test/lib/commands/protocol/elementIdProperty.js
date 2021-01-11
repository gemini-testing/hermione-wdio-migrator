'use strict';

const addElementIdProperty = require('lib/commands/protocol/elementIdProperty');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdProperty" command', () => {
    it('should add "elementIdProperty" command', () => {
        const browser = mkBrowser_();

        addElementIdProperty(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdProperty', sinon.match.func);
    });

    it('should call "getElementProperty" with passed element id and name', async () => {
        const browser = mkBrowser_();

        addElementIdProperty(browser);
        await browser.elementIdProperty('element-id', 'prop-name');

        assert.calledOnceWithExactly(browser.getElementProperty, 'element-id', 'prop-name');
    });
});
