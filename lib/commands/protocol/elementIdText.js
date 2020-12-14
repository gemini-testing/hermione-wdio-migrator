'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdText', function(elementId) {
        return this.getElementText(elementId);
    });
};
