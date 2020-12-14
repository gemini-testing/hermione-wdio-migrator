'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('selectByAttribute', async function(selector, attribute, value) {
        const elem = await findElement(this, selector);

        return elem.selectByAttribute(attribute, value);
    });
};
