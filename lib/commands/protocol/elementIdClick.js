'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdClick', function(elementId) {
        return this.elementClick(elementId);
    });
};
