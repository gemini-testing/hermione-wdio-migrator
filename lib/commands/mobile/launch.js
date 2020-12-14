'use strict';

module.exports = (browser) => {
    browser.addCommand('launch', function() {
        return this.launchApp();
    });
};
