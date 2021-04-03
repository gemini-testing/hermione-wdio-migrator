'use strict';

const {DEFAULT_OFFSET, DEFAULT_SPEED} = require('../../constants');

module.exports = (browser) => {
    browser.addCommand('swipeRight', async function(selector, xOffset = DEFAULT_OFFSET * -1, speed = DEFAULT_SPEED) {
        // make sure xOffset is positive so we scroll left
        xOffset = xOffset < 0 ? xOffset * -1 : xOffset;

        return this.swipe(selector, xOffset, 0, speed);
    });
};
