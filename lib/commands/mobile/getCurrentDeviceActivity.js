'use strict';

module.exports = (browser) => {
    browser.addCommand('getCurrentDeviceActivity', function() {
        return this.getCurrentActivity();
    });
};
