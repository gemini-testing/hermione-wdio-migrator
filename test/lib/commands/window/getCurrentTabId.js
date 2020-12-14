'use strict';

const addGetCurrentTabId = require('lib/commands/window/getCurrentTabId');
const {mkBrowser_} = require('../../../utils');

describe('"getCurrentTabId" command', () => {
    it('should add "getCurrentTabId" command', () => {
        const browser = mkBrowser_();

        addGetCurrentTabId(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getCurrentTabId', sinon.match.func);
    });

    it('should call "getWindowHandle"', async () => {
        const browser = mkBrowser_();

        addGetCurrentTabId(browser);
        await browser.getCurrentTabId();

        assert.calledOnceWithExactly(browser.getWindowHandle);
    });
});
