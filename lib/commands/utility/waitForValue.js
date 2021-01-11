'use strict';

const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('waitForValue', async function(selector, ms = 500, reverse = false) {
        const isReversed = reverse ? 'with' : 'without';
        const timeoutMsg = `element ("${selector}") still ${isReversed} a value after ${ms}ms`;

        const elems = await findElements(this, selector);

        return this.waitUntil(async () => {
            const elemValues = await Promise.map(elems, (elem) => elem.getValue());
            let result = reverse;

            for (let value of elemValues) {
                if (!reverse) {
                    result = result || value !== '';
                } else {
                    result = result && value === '';
                }
            }

            return result !== reverse;
        }, {timeout: ms, timeoutMsg});
    });
};
