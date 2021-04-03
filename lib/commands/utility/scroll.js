'use strict';

const _ = require('lodash');
const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('scroll', async function(selector, xOffset, yOffset) {
        if (_.isNumber(selector) && _.isNumber(xOffset)) {
            yOffset = xOffset;
            xOffset = selector;
            selector = null;

            if (this.isMobile && !this.isW3C) {
                return this.touchScroll(xOffset, yOffset);
            }

            return this.execute(function(x, y) {
                window.scrollTo(x, y);
            }, xOffset, yOffset);
        }

        xOffset = _.isNumber(xOffset) ? xOffset : 0;
        yOffset = _.isNumber(yOffset) ? yOffset : 0;

        const elem = await findElement(this, selector);

        if (this.isMobile && !this.isW3C) {
            return this.touchScroll(xOffset, yOffset, elem.elementId);
        }

        const {x, y} = await elem.getLocation();

        return this.execute(function(x, y) {
            window.scrollTo(x, y);
        }, x + xOffset, y + yOffset);
    });
};
