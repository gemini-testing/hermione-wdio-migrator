'use strict';

const {DEFAULT_OFFSET, DEFAULT_SPEED} = require('../../constants');

module.exports = (browser) => {
    browser.addCommand('swipeLeft', async function(selector, xOffset = DEFAULT_OFFSET, speed = DEFAULT_SPEED) {
        // make sure xOffset is negative so we scroll right
        xOffset = xOffset > 0 ? xOffset * -1 : xOffset;

        return this.swipe(selector, xOffset, 0, speed);
    });
};
