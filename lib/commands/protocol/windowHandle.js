'use strict';

module.exports = (browser) => {
    browser.addCommand('windowHandle', function() {
        return this.getWindowHandle();
    });
};
