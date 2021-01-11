'use strict';

module.exports = (browser) => {
    browser.addCommand('strings', function(lang) {
        return this.getStrings(lang);
    });
};
