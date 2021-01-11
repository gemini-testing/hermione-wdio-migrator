'use strict';

module.exports = (browser) => {
    browser.addCommand('currentActivity', function() {
        return this.getCurrentActivity();
    });
};
