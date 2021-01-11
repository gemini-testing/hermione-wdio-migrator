'use strict';

const Promise = require('bluebird');
const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('clearElement', async function(selector) {
        const elems = await findElements(this, selector);

        return Promise.map(elems, (elem) => elem.clearValue());
    });
};
