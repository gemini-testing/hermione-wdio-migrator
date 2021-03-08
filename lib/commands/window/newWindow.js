'use strict';

const _ = require('lodash');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'newWindow', async function(origNewWindow, url, windowName, windowFeatures) {
        const options = _.isPlainObject(windowName)
            ? windowName
            : {windowName, windowFeatures};

        return origNewWindow(url, options);
    });
};
