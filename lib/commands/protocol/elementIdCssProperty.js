'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdCssProperty', function(elementId, propertyName) {
        return this.getElementCSSValue(elementId, propertyName);
    });
};
