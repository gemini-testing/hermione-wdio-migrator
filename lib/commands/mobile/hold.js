'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('hold', async function(selector) {
        const elem = await findElement(this, selector);

        return this.touchLongClick(elem.elementId);
    });
};
