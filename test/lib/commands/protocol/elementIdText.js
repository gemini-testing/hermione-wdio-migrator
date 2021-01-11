'use strict';

const addElementIdText = require('lib/commands/protocol/elementIdText');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdText" command', () => {
    it('should add "elementIdText" command', () => {
        const browser = mkBrowser_();

        addElementIdText(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdText', sinon.match.func);
    });

    it('should call "getElementText" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdText(browser);
        await browser.elementIdText('element-id');

        assert.calledOnceWithExactly(browser.getElementText, 'element-id');
    });
});
