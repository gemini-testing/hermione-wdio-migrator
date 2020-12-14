'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdDisplayed', function(elementId) {
        return this.isElementDisplayed(elementId);
    });
};
