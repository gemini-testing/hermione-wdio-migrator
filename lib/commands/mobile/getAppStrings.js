'use strict';

module.exports = (browser) => {
    browser.addCommand('getAppStrings', function(lang) {
        return this.getStrings(lang);
    });
};
