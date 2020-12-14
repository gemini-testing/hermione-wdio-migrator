'use strict';

module.exports = (browser) => {
    browser.addCommand('init', function(desiredCapabilities) {
        return this.newSession(desiredCapabilities);
    });
};
