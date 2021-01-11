'use strict';

module.exports = async (browser, selector) => {
    const elem = await browser.$(selector);

    if (elem.error) {
        throw new Error(elem.error.message);
    }

    return elem;
};
