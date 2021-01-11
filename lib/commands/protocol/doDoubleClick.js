'use strict';

module.exports = (browser) => {
    browser.addCommand('doDoubleClick', function() {
        return this.positionDoubleClick();
    });
};
