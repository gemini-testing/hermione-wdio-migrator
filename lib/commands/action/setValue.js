'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('setValue', async function(selector, value) {
        const elem = await findElement(this, selector);

        return elem.setValue(value);
    });
};
