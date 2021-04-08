'use strict';

const _ = require('lodash');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'addCommand', function(origAddCommand, name, method, overwrite) {
        return overwrite && _.isFunction(browser[name])
            ? this.overwriteCommand(name, (_, ...args) => method.call(browser, ...args))
            : origAddCommand(name, method);
    });
};
