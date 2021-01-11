'use strict';

const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('selectorExecuteAsync', async function(selectors, script, ...args) {
        const selectorsArr = [].concat(selectors);
        const elems = await Promise.map(selectorsArr, (selector) => findElements(this, selector));

        return this.executeAsync(script, ...elems, ...args);
    });
};
