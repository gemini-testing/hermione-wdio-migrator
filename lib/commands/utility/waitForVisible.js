'use strict';

const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('waitForVisible', async function(selector, ms = 500, reverse = false) {
        const isReversed = reverse ? '' : 'not ';
        const timeoutMsg = `element ("${selector}") still ${isReversed}visible after ${ms}ms`;

        const elems = await findElements(this, selector);

        return this.waitUntil(async () => {
            const elemDisplayed = await Promise.map(elems, (elem) => elem.isDisplayed());
            let result = reverse;

            for (let displayed of elemDisplayed) {
                if (!reverse) {
                    result = result || displayed;
                } else {
                    result = result && displayed;
                }
            }

            return result !== reverse;
        }, {timeout: ms, timeoutMsg});
    });
};
