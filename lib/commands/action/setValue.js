'use strict';

const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('setValue', async function(selector, value) {
        const elems = await findElements(this, selector);

        return Promise.map(elems, (elem) => elem.setValue(value));
    });
};
