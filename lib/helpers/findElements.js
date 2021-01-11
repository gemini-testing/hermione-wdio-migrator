'use strict';

const _ = require('lodash');

module.exports = async (browser, selector) => {
    const elems = await browser.$$(selector);

    if (_.isEmpty(elems)) {
        throw new Error(`no such element: Unable to locate element by selector: "${selector}"`);
    }

    return elems;
};
