'use strict';

const _ = require('lodash');

module.exports = (browser) => {
    browser.addCommand('switchTab', async function(name) {
        if (name) {
            return this.switchToWindow(name);
        }

        const tabIds = await this.getWindowHandles();

        if (!_.isEmpty(tabIds)) {
            return this.switchToWindow(tabIds[0]);
        }
    });
};
