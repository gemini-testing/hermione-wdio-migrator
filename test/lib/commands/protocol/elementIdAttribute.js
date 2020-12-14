'use strict';

const addElementIdAttribute = require('lib/commands/protocol/elementIdAttribute');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdAttribute" command', () => {
    it('should add "elementIdAttribute" command', () => {
        const browser = mkBrowser_();

        addElementIdAttribute(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdAttribute', sinon.match.func);
    });

    it('should call "getElementAttribute" with passed args', async () => {
        const browser = mkBrowser_();

        addElementIdAttribute(browser);
        await browser.elementIdAttribute('element-id', 'some-attr');

        assert.calledOnceWithExactly(browser.getElementAttribute, 'element-id', 'some-attr');
    });
});
