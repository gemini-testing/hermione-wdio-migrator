'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('selectByValue', async function(selector, value) {
        const elem = await findElement(this, selector);

        return elem.selectByAttribute('value', value);
    });
};
