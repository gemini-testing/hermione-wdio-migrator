'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    const timeout = browser.options.waitforTimeout;

    browser.addCommand('waitForVisible', async function(selector, ms = timeout, reverse = false) {
        const isReversed = reverse ? '' : 'not ';
        const timeoutMsg = `element ("${selector}") still ${isReversed}visible after ${ms}ms`;

        return this.waitUntil(async () => {
            const elems = await findElements(this, selector);

            if (_.isEmpty(elems)) {
                return reverse;
            }

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
