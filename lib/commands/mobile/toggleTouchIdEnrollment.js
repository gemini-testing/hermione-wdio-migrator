'use strict';

module.exports = (browser) => {
    browser.addCommand('toggleTouchIdEnrollment', function(enabled) {
        return this.toggleEnrollTouchId(enabled);
    });
};
