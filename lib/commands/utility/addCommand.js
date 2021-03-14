'use strict';

const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'addCommand', function(origAddCommand, name, method, overwrite) {
        return overwrite
            ? this.overwriteCommand(name, (_, ...args) => method.call(browser, ...args))
            : origAddCommand(name, method);
    });
};
