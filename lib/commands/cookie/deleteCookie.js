'use strict';

const _ = require('lodash');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'deleteCookie', function(origDeleteCookie, names) {
        names = _([]).concat(names).compact().value();

        return _.isEmpty(names)
            ? this.deleteAllCookies()
            : this.deleteCookies(names);
    });
};
