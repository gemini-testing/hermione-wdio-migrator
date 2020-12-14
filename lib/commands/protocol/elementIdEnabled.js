'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdEnabled', function(elementId) {
        return this.isElementEnabled(elementId);
    });
};
