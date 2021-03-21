'use strict';

const addClose = require('lib/commands/window/close');
const {mkBrowser_} = require('../../../utils');

describe('"close" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    afterEach(() => sinon.restore());

    it('should add "close" command', () => {
        addClose(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'close', sinon.match.func);
    });

    describe('window handle is passed', () => {
        it('should close current window', async () => {
            addClose(browser);

            await browser.close('window-id');

            assert.calledOnceWithExactly(browser.closeWindow);
        });

        it('should switch to passed window after close the current one', async () => {
            addClose(browser);

            await browser.close('window-id');

            assert.calledOnceWithExactly(browser.switchToWindow, 'window-id');
            assert.callOrder(browser.closeWindow, browser.switchToWindow);
        });

        it('should not get all available window handles', async () => {
            addClose(browser);

            await browser.close('window-id');

            assert.notCalled(browser.getWindowHandles);
        });
    });

    describe('window handle is not passed', () => {
        beforeEach(() => {
            browser.getWindowHandles.resolves(['window-id-1', 'window-id-2']);
        });

        it('should get all available window handles', async () => {
            addClose(browser);

            await browser.close();

            assert.calledOnceWithExactly(browser.getWindowHandles);
        });

        it('should throw error if all windows are closed', async () => {
            browser.getWindowHandles.resolves([]);
            addClose(browser);

            await assert.isRejected(
                browser.close(),
                'Can\'t switch to the next tab because all windows are closed. ' +
                'Make sure you keep at least one window open!'
            );
        });

        it('should close current window after get all availables', async () => {
            addClose(browser);

            await browser.close();

            assert.calledOnceWithExactly(browser.closeWindow);
            assert.callOrder(browser.getWindowHandles, browser.closeWindow);
        });

        it('should switch to first window after close the current one', async () => {
            browser.getWindowHandles.resolves(['window-id-1', 'window-id-2']);
            addClose(browser);

            await browser.close();

            assert.calledOnceWithExactly(browser.switchToWindow, 'window-id-1');
            assert.callOrder(browser.closeWindow, browser.switchToWindow);
        });
    });
});
