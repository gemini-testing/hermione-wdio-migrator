'use strict';

module.exports = (browser) => {
    browser.addCommand('source', function() {
        return this.getPageSource();
    });
};
