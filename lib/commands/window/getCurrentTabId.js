'use strict';

module.exports = (browser) => {
    browser.addCommand('getCurrentTabId', function() {
        return this.getWindowHandle();
    });
};
