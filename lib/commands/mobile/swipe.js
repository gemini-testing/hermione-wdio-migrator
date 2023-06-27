'use strict';

const _ = require('lodash');
const getPerformActionId = require('../../helpers/getPerformActionId');
const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    const validateParams = (selector, xOffset, yOffset, speed) => {
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
    };

    if (browser.isW3C) {
        browser.addCommand('swipe', async function(selector, xOffset, yOffset, speed) {
            validateParams(selector, xOffset, yOffset, speed);

            const elem = await findElement(this, selector);

            // Computing swipe duration by swipe distance and speed. Speed is measured in px/sec, hence we need to * 1000
            const moveDuration = Math.hypot(xOffset, yOffset) / speed * 1000;

            return this.performActions([{
                type: 'pointer',
                id: getPerformActionId(browser),
                parameters: {pointerType: 'touch'},
                actions: [
                    {type: 'pointerMove', duration: 0, origin: elem, x: 0, y: 0},
                    {type: 'pointerDown', button: 0},
                    {type: 'pointerMove', duration: moveDuration, origin: elem, x: xOffset, y: yOffset},
                    {type: 'pointerUp', button: 0}
                ]
            }]);
        });
    } else {
        browser.addCommand('swipe', async function(selector, xOffset, yOffset, speed) {
            validateParams(selector, xOffset, yOffset, speed);

            const elem = await findElement(this, selector);

            return browser.touchFlick(xOffset, yOffset, elem.elementId, speed);
        });
    }
};
