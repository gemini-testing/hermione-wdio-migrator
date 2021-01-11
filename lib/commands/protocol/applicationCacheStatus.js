'use strict';

module.exports = (browser) => {
    browser.addCommand('applicationCacheStatus', function() {
        return this.getApplicationCacheStatus();
    });
};
