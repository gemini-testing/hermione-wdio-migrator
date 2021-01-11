'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdClear', function(elementId) {
        return this.elementClear(elementId);
    });
};
