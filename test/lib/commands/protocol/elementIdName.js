'use strict';

const addElementIdName = require('lib/commands/protocol/elementIdName');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdName" command', () => {
    it('should add "elementIdName" command', () => {
        const browser = mkBrowser_();

        addElementIdName(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdName', sinon.match.func);
    });

    it('should call "getElementTagName" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdName(browser);
        await browser.elementIdName('element-id');

        assert.calledOnceWithExactly(browser.getElementTagName, 'element-id');
    });
});
