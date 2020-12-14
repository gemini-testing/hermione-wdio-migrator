'use strict';

const addWindowHandleMaximize = require('lib/commands/protocol/windowHandleMaximize');
const {mkBrowser_} = require('../../../utils');

describe('"windowHandleMaximize" command', () => {
    it('should add "windowHandleMaximize" command', () => {
        const browser = mkBrowser_();

        addWindowHandleMaximize(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'windowHandleMaximize', sinon.match.func);
    });

    it('should switch to passed window id before maximize it', async () => {
        const browser = mkBrowser_();

        addWindowHandleMaximize(browser);
        await browser.windowHandleMaximize('window-id');

        assert.calledOnceWithExactly(browser.switchToWindow, 'window-id');
        assert.callOrder(browser.switchToWindow, browser.maximizeWindow);
    });

    it('should only maximize window if id is not passed', async () => {
        const browser = mkBrowser_();

        addWindowHandleMaximize(browser);
        await browser.windowHandleMaximize();

        assert.calledOnceWithExactly(browser.maximizeWindow);
        assert.notCalled(browser.switchToWindow);
    });
});
