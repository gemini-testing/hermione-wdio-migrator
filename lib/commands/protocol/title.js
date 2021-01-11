'use strict';

module.exports = (browser) => {
    browser.addCommand('title', function() {
        return this.getTitle();
    });
};
