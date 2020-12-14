'use strict';

module.exports = (browser) => {
    browser.addCommand('moveTo', function(element, xOffset, yOffset) {
        return this.moveToElement(element, xOffset, yOffset);
    });
};
