'use strict';

const addGetTabIds = require('lib/commands/window/getTabIds');
const {mkBrowser_} = require('../../../utils');

describe('"getTabIds" command', () => {
    it('should add "getTabIds" command', () => {
        const browser = mkBrowser_();

        addGetTabIds(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getTabIds', sinon.match.func);
    });

    it('should call "getWindowHandles"', async () => {
        const browser = mkBrowser_();

        addGetTabIds(browser);
        await browser.getTabIds();

        assert.calledOnceWithExactly(browser.getWindowHandles);
    });
});
