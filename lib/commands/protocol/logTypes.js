'use strict';

module.exports = (browser) => {
    browser.addCommand('logTypes', function() {
        return this.getLogTypes();
    });
};
