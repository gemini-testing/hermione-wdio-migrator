'use strict';

const addSwitchTab = require('lib/commands/window/switchTab');
const {mkBrowser_} = require('../../../utils');

describe('"switchTab" command', () => {
    it('should add "switchTab" command', () => {
        const browser = mkBrowser_();

        addSwitchTab(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'switchTab', sinon.match.func);
    });

    it('should switch to passed window', async () => {
        const browser = mkBrowser_();

        addSwitchTab(browser);
        await browser.switchTab('window-id');

        assert.calledOnceWithExactly(browser.switchToWindow, 'window-id');
        assert.notCalled(browser.getWindowHandles);
    });

    it('should switch to first found window if window is not passed', async () => {
        const browser = mkBrowser_();
        browser.getWindowHandles.resolves(['first-id', 'second-id']);

        addSwitchTab(browser);
        await browser.switchTab();

        assert.calledOnceWithExactly(browser.switchToWindow, 'first-id');
    });

    it('should not switch to window if window is not passed and not one is found', async () => {
        const browser = mkBrowser_();
        browser.getWindowHandles.resolves([]);

        addSwitchTab(browser);
        await browser.switchTab();

        assert.notCalled(browser.switchToWindow);
    });
});
