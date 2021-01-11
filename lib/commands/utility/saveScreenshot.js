'use strict';

module.exports = (browser) => {
    browser.overwriteCommand('saveScreenshot', async function(origSaveScreenshot, filename) {
        return filename
            ? origSaveScreenshot(filename)
            : this.takeScreenshot();
    });
};
