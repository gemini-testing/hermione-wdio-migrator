'use strict';

module.exports = (browser) => {
    browser.addCommand('log', function(type) {
        return this.getLogs(type);
    });
};
