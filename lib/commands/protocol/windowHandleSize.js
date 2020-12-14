'use strict';

const _ = require('lodash');

module.exports = (browser) => {
    browser.addCommand('windowHandleSize', async function(windowHandle, dimension) {
        if (!_.isString(windowHandle)) {
            dimension = windowHandle;
        } else {
            await this.switchToWindow(windowHandle);
        }

        return dimension
            ? this.setWindowSize(dimension.width, dimension.height)
            : this.getWindowSize();
    });
};
