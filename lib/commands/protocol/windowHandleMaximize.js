'use strict';

module.exports = (browser) => {
    browser.addCommand('windowHandleMaximize', async function(windowHandle) {
        if (windowHandle) {
            await this.switchToWindow(windowHandle);
        }

        return this.maximizeWindow();
    });
};
