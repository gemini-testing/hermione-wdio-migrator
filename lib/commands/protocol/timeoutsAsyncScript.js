'use strict';

module.exports = (browser) => {
    browser.addCommand('timeoutsAsyncScript', function(ms) {
        return this.setAsyncTimeout(ms);
    });
};
