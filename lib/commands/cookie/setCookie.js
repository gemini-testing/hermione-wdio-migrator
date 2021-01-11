'use strict';

module.exports = (browser) => {
    browser.addCommand('setCookie', function(cookies) {
        return this.setCookies(cookies);
    });
};
