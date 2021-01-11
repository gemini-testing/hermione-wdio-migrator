'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('getValue', async function(selector) {
        const elem = await findElement(this, selector);

        return elem.getValue();
    });
};
