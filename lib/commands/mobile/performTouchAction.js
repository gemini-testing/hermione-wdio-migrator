'use strict';

module.exports = (browser) => {
    browser.addCommand('performTouchAction', function(actions) {
        return this.touchPerform(actions);
    });
};
