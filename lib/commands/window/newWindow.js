'use strict';

const _ = require('lodash');

module.exports = (browser) => {
    browser.overwriteCommand('newWindow', async function(origNewWindow, url, windowName, windowFeatures) {
        const options = _.isPlainObject(windowName)
            ? windowName
            : {windowName, windowFeatures};

        return origNewWindow(url, options);
    });
};
