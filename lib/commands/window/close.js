'use strict';

module.exports = (browser) => {
    browser.addCommand('close', async function(windowHandle) {
        if (windowHandle) {
            await this.closeWindow();
            return this.switchToWindow(windowHandle);
        }

        const windowHandles = await this.getWindowHandles();

        if (windowHandles.length === 0) {
            throw new Error(
                'Can\'t switch to the next tab because all windows are closed. ' +
                'Make sure you keep at least one window open!'
            );
        }

        await this.closeWindow();
        return this.switchToWindow(windowHandles[0]);
    });
};
