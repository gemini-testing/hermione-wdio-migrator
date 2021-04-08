'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('setValue', async function(selector, value) {
        const elem = await findElement(this, selector);

        // temporary hack
        if (!browser.isW3C && browser.isIOS) {
            await elem.clearValue();

            return this.elementSendKeys(elem.elementId, value);
        }

        return elem.setValue(value);
    });
};
