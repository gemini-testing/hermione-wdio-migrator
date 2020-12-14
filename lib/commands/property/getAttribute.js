'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('getAttribute', async function(selector, attributeName) {
        const elem = await findElement(this, selector);

        return elem.getAttribute(attributeName);
    });
};
