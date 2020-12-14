'use strict';

const {DEFAULT_OFFSET, DEFAULT_SPEED} = require('../../constants');

module.exports = (browser) => {
    browser.addCommand('swipeDown', async function(selector, yOffset = DEFAULT_OFFSET, speed = DEFAULT_SPEED) {
        // make sure yOffset is positive so we scroll up
        yOffset = yOffset < 0 ? yOffset * -1 : yOffset;

        return this.swipe(selector, 0, yOffset, speed);
    });
};
