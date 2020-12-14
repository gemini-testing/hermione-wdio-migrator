'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.overwriteCommand('getElementSize', async function(origGetElementSize, selector, prop) {
        const elem = await findElement(this, selector);
        const size = await origGetElementSize(elem.elementId);

        return prop ? size[prop] : size;
    });
};
