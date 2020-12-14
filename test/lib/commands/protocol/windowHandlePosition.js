'use strict';

const addWindowHandlePosition = require('lib/commands/protocol/windowHandlePosition');
const {mkBrowser_} = require('../../../utils');

describe('"windowHandlePosition" command', () => {
    it('should add "windowHandlePosition" command', () => {
        const browser = mkBrowser_();

        addWindowHandlePosition(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'windowHandlePosition', sinon.match.func);
    });

    describe('should switch to passed window id before', () => {
        it('change position', async () => {
            const browser = mkBrowser_();

            addWindowHandlePosition(browser);
            await browser.windowHandlePosition('window-id', {x: 100, y: 200});

            assert.calledOnceWithExactly(browser.switchToWindow, 'window-id');
            assert.callOrder(browser.switchToWindow, browser.setWindowPosition);
        });

        it('get position', async () => {
            const browser = mkBrowser_();

            addWindowHandlePosition(browser);
            await browser.windowHandlePosition('window-id');

            assert.calledOnceWithExactly(browser.switchToWindow, 'window-id');
            assert.callOrder(browser.switchToWindow, browser.getWindowPosition);
        });
    });

    it('should get current window position', async () => {
        const browser = mkBrowser_();

        addWindowHandlePosition(browser);
        await browser.windowHandlePosition();

        assert.calledOnceWithExactly(browser.getWindowPosition);
        assert.notCalled(browser.switchToWindow);
    });

    it('should set window position for current window', async () => {
        const browser = mkBrowser_();

        addWindowHandlePosition(browser);
        await browser.windowHandlePosition({x: 100, y: 200});

        assert.calledOnceWithExactly(browser.setWindowPosition, 100, 200);
        assert.notCalled(browser.switchToWindow);
    });
});
