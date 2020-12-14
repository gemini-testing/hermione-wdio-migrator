'use strict';

module.exports = (browser) => {
    browser.addCommand('setImmediateValue', function(elementId, value) {
        return this.setValueImmediate(elementId, value);
    });
};
