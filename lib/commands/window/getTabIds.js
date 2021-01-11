'use strict';

module.exports = (browser) => {
    browser.addCommand('getTabIds', function() {
        return this.getWindowHandles();
    });
};
