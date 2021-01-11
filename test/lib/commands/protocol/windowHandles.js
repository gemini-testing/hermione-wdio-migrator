'use strict';

const addWindowHandles = require('lib/commands/protocol/windowHandles');
const {mkBrowser_} = require('../../../utils');

describe('"windowHandles" command', () => {
    it('should add "windowHandles" command', () => {
        const browser = mkBrowser_();

        addWindowHandles(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'windowHandles', sinon.match.func);
    });

    it('should call "getWindowHandles"', async () => {
        const browser = mkBrowser_();

        addWindowHandles(browser);
        await browser.windowHandles();

        assert.calledOnceWithExactly(browser.getWindowHandles);
    });
});
