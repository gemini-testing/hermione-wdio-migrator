'use strict';

module.exports = (browser) => {
    browser.addCommand('localStorageSize', function() {
        return this.getLocalStorageSize();
    });
};
