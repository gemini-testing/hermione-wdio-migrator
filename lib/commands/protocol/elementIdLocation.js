'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdLocation', function(elementId) {
        return this.getElementLocation(elementId);
    });
};
