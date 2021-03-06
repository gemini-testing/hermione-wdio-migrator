'use strict';

const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'saveScreenshot', async function(origSaveScreenshot, filename) {
        return filename
            ? origSaveScreenshot(filename)
            : this.takeScreenshot();
    });
};
