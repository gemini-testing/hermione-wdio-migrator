'use strict';

module.exports = (browser) => {
    browser.addCommand('end', function() {
        return this.deleteSession();
    });
};
