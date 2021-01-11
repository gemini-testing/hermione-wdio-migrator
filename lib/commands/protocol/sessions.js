'use strict';

module.exports = (browser) => {
    browser.addCommand('sessions', function() {
        return this.getSessions();
    });
};
