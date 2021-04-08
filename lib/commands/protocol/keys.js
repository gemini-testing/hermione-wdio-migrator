'use strict';

const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'keys', async function(origKeys, value) {
        // TODO: remove after - https://github.com/appium/appium/issues/15253
        return this.isW3C && this.isAndroid
            ? this.sendKeys([].concat(value))
            : origKeys(value);
    });
};
