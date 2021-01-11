'use strict';

const {DEFAULT_OFFSET, DEFAULT_SPEED} = require('../../constants');

module.exports = (browser) => {
    browser.addCommand('swipeUp', async function(selector, yOffset = DEFAULT_OFFSET * -1, speed = DEFAULT_SPEED) {
        // make sure yOffset is negative so we scroll down
        yOffset = yOffset > 0 ? yOffset * -1 : yOffset;

        return this.swipe(selector, 0, yOffset, speed);
    });
};
