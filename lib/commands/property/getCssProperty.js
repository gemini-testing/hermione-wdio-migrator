'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('getCssProperty', async function(selector, cssProperty) {
        const elem = await findElement(this, selector);

        return elem.getCssProperty(cssProperty);
    });
};
