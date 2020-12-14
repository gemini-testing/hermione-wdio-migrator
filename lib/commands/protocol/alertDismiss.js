'use strict';

module.exports = (browser) => {
    browser.addCommand('alertDismiss', function() {
        return this.dismissAlert();
    });
};
