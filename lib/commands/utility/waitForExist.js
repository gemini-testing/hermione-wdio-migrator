'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('waitForExist', async function(selector, ms = 500, reverse = false) {
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
