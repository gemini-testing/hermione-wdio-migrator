'use strict';

module.exports = (browser) => {
    browser.addCommand('screenshot', function() {
        return this.takeScreenshot();
    });
};
