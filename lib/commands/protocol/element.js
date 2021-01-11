'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('element', function(selector) {
        return findElement(this, selector);
    });
};
