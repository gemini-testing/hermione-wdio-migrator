'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('selectByIndex', async function(selector, index) {
        const elem = await findElement(this, selector);

        return elem.selectByIndex(index);
    });
};
