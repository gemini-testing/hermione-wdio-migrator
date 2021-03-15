'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('waitForEnabled', async function(selector, ms = 500, reverse = false) {
        const isReversed = reverse ? '' : 'not ';
        const timeoutMsg = `element ("${selector}") still ${isReversed}enabled after ${ms}ms`;

        return this.waitUntil(async () => {
            const elems = await findElements(this, selector);

            if (_.isEmpty(elems)) {
                return reverse;
            }

            const elemEnabled = await Promise.map(elems, (elem) => elem.isEnabled());
            let result = reverse;

            for (let enable of elemEnabled) {
                if (!reverse) {
                    result = result || enable;
                } else {
                    result = result && enable;
                }
            }

            return result !== reverse;
        }, {timeout: ms, timeoutMsg});
    });
};
