'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('getLocationInView', async function(selector) {
        const elem = await findElement(this, selector);

        return browser.getElementLocationInView(elem.elementId);
    });
};
