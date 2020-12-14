'use strict';

const _ = require('lodash');

module.exports = (browser) => {
    browser.overwriteCommand('deleteCookie', function(origDeleteCookie, names) {
        names = _([]).concat(names).compact().value();

        return _.isEmpty(names)
            ? this.deleteAllCookies()
            : this.deleteCookies(names);
    });
};
