'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('addValue', async function(selector, value) {
        const elem = await findElement(this, selector);

        return elem.addValue(value);
    });
};
