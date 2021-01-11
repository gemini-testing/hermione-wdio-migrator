'use strict';

const findStrategy = require('../../helpers/findStrategy');

module.exports = (browser) => {
    browser.addCommand('elementIdElement', function(elementId, selector) {
        const {using, value} = findStrategy(selector);

        return this.findElementFromElement(elementId, using, value);
    });
};
