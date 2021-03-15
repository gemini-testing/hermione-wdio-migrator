'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('waitForSelected', async function(selector, ms = 500, reverse = false) {
        const isReversed = reverse ? '' : 'not ';
        const timeoutMsg = `element ("${selector}") still ${isReversed}selected after ${ms}ms`;

        return this.waitUntil(async () => {
            const elems = await findElements(this, selector);

            if (_.isEmpty(elems)) {
                return reverse;
            }

            const elemSelected = await Promise.map(elems, (elem) => elem.isSelected());
            let result = reverse;

            for (let select of elemSelected) {
                if (!reverse) {
                    result = result || select;
                } else {
                    result = result && select;
                }
            }

            return result !== reverse;
        }, {timeout: ms, timeoutMsg});
    });
};
