'use strict';

module.exports = (browser) => {
    browser.addCommand('imeActivate', function(engine) {
        return this.activateIME(engine);
    });
};
