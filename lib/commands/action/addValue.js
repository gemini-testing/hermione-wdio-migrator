'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('addValue', async function(selector, value) {
        const elem = await findElement(this, selector);

        // temporary hack
        if (!browser.isW3C && browser.isIOS) {
            return this.elementSendKeys(elem.elementId, value);
        }

        return elem.addValue(value);
    });
};
