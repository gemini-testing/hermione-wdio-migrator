'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('addValue', async function(selector, value) {
        const elem = await findElement(this, selector);

        // temporary hack (android - https://github.com/webdriverio/webdriverio/issues/6690)
        if (!browser.isW3C && browser.isMobile) {
            return this.elementSendKeys(elem.elementId, value);
        }

        return elem.addValue(value);
    });
};
