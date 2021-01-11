'use strict';

module.exports = (browser) => {
    browser.addCommand('alertAccept', function() {
        return this.acceptAlert();
    });
};
