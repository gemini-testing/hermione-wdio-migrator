'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdName', function(elementId) {
        return this.getElementTagName(elementId);
    });
};
