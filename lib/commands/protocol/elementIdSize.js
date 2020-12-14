'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdSize', function(elementId) {
        return this.getElementSize(elementId);
    });
};
