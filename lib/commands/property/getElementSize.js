'use strict';

const findElement = require('../../helpers/findElement');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'getElementSize', async function(origGetElementSize, selector, prop) {
        const elem = await findElement(this, selector);
        const size = await origGetElementSize(elem.elementId);

        return prop ? size[prop] : size;
    });
};
