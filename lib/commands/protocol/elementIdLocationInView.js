'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdLocationInView', function(elementId) {
        return this.getElementLocationInView(elementId);
    });
};
