'use strict';

module.exports = (browser) => {
    browser.addCommand('imeActivated', function() {
        return this.isIMEActivated();
    });
};
