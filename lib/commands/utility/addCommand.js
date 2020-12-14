'use strict';

module.exports = (browser) => {
    browser.overwriteCommand('addCommand', function(origAddCommand, name, method, overwrite) {
        return overwrite
            ? this.overwriteCommand(name, (_, ...args) => method(...args))
            : origAddCommand(name, method);
    });
};
