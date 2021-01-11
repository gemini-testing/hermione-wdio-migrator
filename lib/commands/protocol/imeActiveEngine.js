'use strict';

module.exports = (browser) => {
    browser.addCommand('imeActiveEngine', function() {
        return this.getActiveEngine();
    });
};
