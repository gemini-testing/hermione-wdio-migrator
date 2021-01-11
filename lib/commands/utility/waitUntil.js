'use strict';

const _ = require('lodash');

module.exports = (browser) => {
    browser.overwriteCommand('waitUntil', async function(origWaitUntil, condition, timeout = 5000, timeoutMsg = '', interval = 500) {
        const options = _.isPlainObject(timeout)
            ? timeout
            : {timeout, timeoutMsg, interval};

        return origWaitUntil(condition, options);
    });
};
