'use strict';

module.exports = (browser) => {
    browser.addCommand('imeAvailableEngines', function() {
        return this.getAvailableEngines();
    });
};
