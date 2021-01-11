'use strict';

module.exports = (browser) => {
    browser.addCommand('sessionStorageSize', function() {
        return this.getSessionStorageSize();
    });
};
