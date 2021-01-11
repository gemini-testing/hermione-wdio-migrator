'use strict';

const addClose = require('lib/commands/window/close');
const {mkBrowser_} = require('../../../utils');

describe('"close" command', () => {
    it('should add "close" command', () => {
        const browser = mkBrowser_();

        addClose(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'close', sinon.match.func);
    });

    it('should close current window', async () => {
        const browser = mkBrowser_();

        addClose(browser);
        await browser.close();

        assert.calledOnceWithExactly(browser.closeWindow);
    });

    it('should not switch to window if it not passed', async () => {
        const browser = mkBrowser_();

        addClose(browser);
        await browser.close();

        assert.notCalled(browser.switchToWindow);
    });

    it('should switch to passed window after close current one', async () => {
        const browser = mkBrowser_();

        addClose(browser);
        await browser.close('window-id');

        assert.calledOnceWithExactly(browser.switchToWindow, 'window-id');
        assert.callOrder(browser.close, browser.switchToWindow);
    });
});
