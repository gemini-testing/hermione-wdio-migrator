'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdValue', function(elementId, value) {
        return this.elementSendKeys(elementId, value);
    });
};
