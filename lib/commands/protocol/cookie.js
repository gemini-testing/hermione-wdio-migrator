'use strict';

const _ = require('lodash');

const DELETE_METHOD = 'delete';

module.exports = (browser) => {
    browser.addCommand('cookie', function(method, cookie) {
        if (method === DELETE_METHOD) {
            return _.isEmpty(cookie)
                ? this.deleteAllCookies()
                : this.deleteCookie(cookie);
        }

        return _.isEmpty(cookie)
            ? this.getAllCookies()
            : this.addCookie(cookie);
    });
};
