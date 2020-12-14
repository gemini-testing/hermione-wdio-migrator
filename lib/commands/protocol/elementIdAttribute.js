'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdAttribute', function(elementId, name) {
        return this.getElementAttribute(elementId, name);
    });
};
