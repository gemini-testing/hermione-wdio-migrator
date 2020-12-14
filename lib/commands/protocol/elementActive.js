'use strict';

module.exports = (browser) => {
    browser.addCommand('elementActive', function() {
        return this.getActiveElement();
    });
};
