'use strict';

module.exports = (browser) => {
    browser.addCommand('imeDeactivated', function() {
        return this.deactivateIME();
    });
};
