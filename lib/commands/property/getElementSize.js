'use strict';

const findElement = require('../../helpers/findElement');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    if (browser.isW3C) {
        browser.addCommand('getElementSize', async function(selector, prop) {
            const elem = await findElement(this, selector);

            return elem.getSize(prop);
        });

        return;
    }

    overwriteExistingCommand(browser, 'getElementSize', async function(origGetElementSize, selector, prop) {
        const elem = await findElement(this, selector);
        const size = await origGetElementSize(elem.elementId);

        return prop ? size[prop] : size;
    });
};
