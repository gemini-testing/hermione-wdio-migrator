'use strict';

const addElementIdEnabled = require('lib/commands/protocol/elementIdEnabled');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdEnabled" command', () => {
    it('should add "elementIdEnabled" command', () => {
        const browser = mkBrowser_();

        addElementIdEnabled(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdEnabled', sinon.match.func);
    });

    it('should call "isElementEnabled" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdEnabled(browser);
        await browser.elementIdEnabled('element-id');

        assert.calledOnceWithExactly(browser.isElementEnabled, 'element-id');
    });
});
