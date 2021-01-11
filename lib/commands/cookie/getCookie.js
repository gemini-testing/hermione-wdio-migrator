'use strict';

module.exports = (browser) => {
    browser.addCommand('getCookie', function(names) {
        return this.getCookies(names);
    });
};
