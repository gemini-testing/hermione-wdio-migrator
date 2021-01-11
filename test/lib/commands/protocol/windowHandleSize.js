'use strict';

const addWindowHandleSize = require('lib/commands/protocol/windowHandleSize');
const {mkBrowser_} = require('../../../utils');

describe('"windowHandleSize" command', () => {
    it('should add "windowHandleSize" command', () => {
        const browser = mkBrowser_();

        addWindowHandleSize(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'windowHandleSize', sinon.match.func);
    });

    describe('should switch to passed window id before', () => {
        it('set window size', async () => {
            const browser = mkBrowser_();

            addWindowHandleSize(browser);
            await browser.windowHandleSize('window-id', {width: 100, height: 200});

            assert.calledOnceWithExactly(browser.switchToWindow, 'window-id');
            assert.callOrder(browser.switchToWindow, browser.setWindowSize);
        });

        it('get window size', async () => {
            const browser = mkBrowser_();

            addWindowHandleSize(browser);
            await browser.windowHandleSize('window-id');

            assert.calledOnceWithExactly(browser.switchToWindow, 'window-id');
            assert.callOrder(browser.switchToWindow, browser.getWindowSize);
        });
    });

    it('should get current window size', async () => {
        const browser = mkBrowser_();

        addWindowHandleSize(browser);
        await browser.windowHandleSize();

        assert.calledOnceWithExactly(browser.getWindowSize);
        assert.notCalled(browser.switchToWindow);
    });

    it('should set window position for current window', async () => {
        const browser = mkBrowser_();

        addWindowHandleSize(browser);
        await browser.windowHandleSize({width: 100, height: 200});

        assert.calledOnceWithExactly(browser.setWindowSize, 100, 200);
        assert.notCalled(browser.switchToWindow);
    });
});
