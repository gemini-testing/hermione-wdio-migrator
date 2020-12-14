'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('moveToObject', async function(selector, xOffset, yOffset) {
        const elem = await findElement(this, selector);

        return elem.moveTo({xOffset, yOffset});
    });
};
