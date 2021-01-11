'use strict';

const _ = require('lodash');
const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('scroll', async function(selector, xOffset, yOffset) {
        if (_.isNumber(selector) && _.isNumber(xOffset)) {
            yOffset = xOffset;
            xOffset = selector;
            selector = null;

            return this.touchScroll(xOffset, yOffset);
        }

        const elem = await findElement(this, selector);

        return this.touchScroll(xOffset, yOffset, elem.elementId);
    });
};
