'use strict';

module.exports = (browser) => {
    browser.addCommand('windowHandles', function() {
        return this.getWindowHandles();
    });
};
