'use strict';

module.exports = (browser) => {
    browser.addCommand('getSource', function() {
        return this.getPageSource();
    });
};
