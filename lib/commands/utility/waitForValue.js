'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    const timeout = browser.options.waitforTimeout;

    browser.addCommand('waitForValue', async function(selector, ms = timeout, reverse = false) {
        const isReversed = reverse ? 'with' : 'without';
        const timeoutMsg = `element ("${selector}") still ${isReversed} a value after ${ms}ms`;

        return this.waitUntil(async () => {
            const elems = await findElements(this, selector);

            if (_.isEmpty(elems)) {
                return reverse;
            }

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
