'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('clearElement', async function(selector) {
        const elem = await findElement(this, selector);

        return elem.clearValue();
    });
};
