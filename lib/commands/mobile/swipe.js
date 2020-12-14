'use strict';

const _ = require('lodash');
const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('swipe', async function(selector, xOffset, yOffset, speed) {
        if (typeof selector === 'number') {
            throw new TypeError(
                'Method "swipe" does not implement the functionality "swipe(xspeed, yspeed)"' +
                ' try to use "swipe(selector, xOffset, yOffset, speed)"'
            );
        }

        if (!_.isNumber(xOffset) || !_.isNumber(yOffset) || !_.isNumber(speed)) {
            throw new TypeError(
                'Arguments "xOffset", "yOffset" and "speed" must be a numbers'
            );
        }

        const elem = await findElement(this, selector);

        return browser.touchFlick(xOffset, yOffset, elem.elementId, speed);
    });
};
