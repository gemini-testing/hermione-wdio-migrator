'use strict';

const _ = require('lodash');

module.exports = (browser) => {
    browser.addCommand('timeouts', function(type, ms) {
        if (!type && !ms) {
            return this.getTimeouts();
        }

        return _.isPlainObject(type)
            ? this.setTimeout(type)
            : this.setTimeout({[type]: ms});
    });
};
