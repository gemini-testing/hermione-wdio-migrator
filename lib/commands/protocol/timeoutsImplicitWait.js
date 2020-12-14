'use strict';

module.exports = (browser) => {
    browser.addCommand('timeoutsImplicitWait', function(ms) {
        return this.setImplicitTimeout(ms);
    });
};
