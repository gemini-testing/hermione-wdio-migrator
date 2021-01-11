'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdProperty', function(elementId, name) {
        return this.getElementProperty(elementId, name);
    });
};
