'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('getLocation', async function(selector, property) {
        const elem = await findElement(this, selector);

        return elem.getLocation(property);
    });
};
