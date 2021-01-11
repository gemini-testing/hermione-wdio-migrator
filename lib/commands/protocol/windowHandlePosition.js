'use strict';

const _ = require('lodash');

module.exports = (browser) => {
    browser.addCommand('windowHandlePosition', async function(windowHandle, position) {
        if (!_.isString(windowHandle)) {
            position = windowHandle;
        } else {
            await this.switchToWindow(windowHandle);
        }

        return position
            ? this.setWindowPosition(position.x, position.y)
            : this.getWindowPosition();
    });
};
