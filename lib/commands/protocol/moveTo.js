'use strict';

module.exports = (browser) => {
    browser.addCommand('moveTo', async function(element, xOffset, yOffset) {
        if (browser.isW3C && !browser.moveToElement) {
            throw new Error('Use "moveTo" command on element or "moveToObject" on browser');
        }

        return browser.moveToElement(element, xOffset, yOffset);
    });
};
