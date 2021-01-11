'use strict';

module.exports = (browser) => {
    browser.addCommand('hideDeviceKeyboard', function(strategy) {
        return this.hideKeyboard(strategy);
    });
};
