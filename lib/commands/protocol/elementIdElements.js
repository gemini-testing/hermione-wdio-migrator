'use strict';

const findStrategy = require('../../helpers/findStrategy');

module.exports = (browser) => {
    browser.addCommand('elementIdElements', function(elementId, selector) {
        const {using, value} = findStrategy(selector);

        return this.findElementsFromElement(elementId, using, value);
    });
};
