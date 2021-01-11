'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('selectByVisibleText', async function(selector, text) {
        const elem = await findElement(this, selector);

        return elem.selectByVisibleText(text);
    });
};
