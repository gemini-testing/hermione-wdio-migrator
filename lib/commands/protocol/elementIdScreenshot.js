'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdScreenshot', function(elementId, scroll) {
        return this.takeElementScreenshot(elementId, scroll);
    });
};
