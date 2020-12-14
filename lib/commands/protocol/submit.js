'use strict';

module.exports = (browser) => {
    browser.addCommand('submit', function(elementId) {
        return this.elementSubmit(elementId);
    });
};
