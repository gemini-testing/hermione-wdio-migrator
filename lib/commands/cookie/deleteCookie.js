'use strict';

const _ = require('lodash');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'deleteCookie', function(origDeleteCookie, name) {
        return _.isEmpty(name)
            ? this.deleteAllCookies()
            : origDeleteCookie(name);
    });
};
