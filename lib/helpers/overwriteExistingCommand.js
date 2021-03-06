'use strict';

const _ = require('lodash');

module.exports = (browser, ...args) => {
    const cmdName = args[0];

    if (!_.isFunction(browser[cmdName])) {
        return;
    }

    browser.overwriteCommand(...args);
};
