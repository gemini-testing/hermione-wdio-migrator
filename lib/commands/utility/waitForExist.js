'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    const timeout = browser.options.waitforTimeout;

    browser.addCommand('waitForExist', async function(selector, ms = timeout, reverse = false) {
        const isReversed = reverse ? '' : 'not ';
        const timeoutMsg = `element ("${selector}") still ${isReversed}existing after ${ms}ms`;

        return this.waitUntil(async () => {
            const elems = await findElements(this, selector);

            if (_.isEmpty(elems)) {
                return reverse;
            }

            const elemExisting = await Promise.map(elems, (elem) => elem.isExisting());
            let result = reverse;

            for (let exist of elemExisting) {
                if (!reverse) {
                    result = result || exist;
                } else {
                    result = result && exist;
                }
            }

            return result !== reverse;
        }, {timeout: ms, timeoutMsg});
    });
};
