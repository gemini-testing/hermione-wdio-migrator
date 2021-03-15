'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('waitForText', async function(selector, ms = 500, reverse = false) {
        const isReversed = reverse ? 'with' : 'without';
        const timeoutMsg = `element ("${selector}") still ${isReversed} text after ${ms}ms`;

        return this.waitUntil(async () => {
            const elems = await findElements(this, selector);

            if (_.isEmpty(elems)) {
                return reverse;
            }

            const elemTexts = await Promise.map(elems, (elem) => elem.getText());
            let result = reverse;

            for (let text of elemTexts) {
                if (!reverse) {
                    result = result || text !== '';
                } else {
                    result = result && text === '';
                }
            }

            return result !== reverse;
        }, {timeout: ms, timeoutMsg});
    });
};
