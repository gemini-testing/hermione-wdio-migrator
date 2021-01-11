'use strict';

const findElements = require('../../helpers/findElements');

module.exports = (browser) => {
    browser.addCommand('elements', function(selector) {
        return findElements(this, selector);
    });
};
