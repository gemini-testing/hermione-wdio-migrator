'use strict';

module.exports = (browser) => {
    browser.addCommand('contexts', function() {
        return this.getContexts();
    });
};
