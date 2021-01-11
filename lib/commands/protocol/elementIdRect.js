'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdRect', function(elementId) {
        return this.getElementRect(elementId);
    });
};
