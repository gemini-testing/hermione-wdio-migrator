'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('setValue', async function(selector, value) {
        const elem = await findElement(this, selector);

        // temporary hack (android - https://github.com/webdriverio/webdriverio/issues/6690)
        if (!browser.isW3C && browser.isMobile) {
            await elem.clearValue();

            return this.elementSendKeys(elem.elementId, [].concat(value).join(''));
        }

        return elem.setValue(value);
    });
};
