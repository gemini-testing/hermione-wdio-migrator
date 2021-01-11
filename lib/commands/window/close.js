'use strict';

module.exports = (browser) => {
    browser.addCommand('close', async function(windowHandle) {
        await this.closeWindow();

        if (windowHandle) {
            await this.switchToWindow(windowHandle);
        }
    });
};
