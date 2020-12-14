'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('isVisibleWithinViewport', async function(selector) {
        const elem = await findElement(this, selector);

        return elem.isDisplayedInViewport();
    });
};
