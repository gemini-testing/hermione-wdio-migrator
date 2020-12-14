'use strict';

module.exports = (browser) => {
    browser.addCommand('performMultiAction', function(actions) {
        return this.multiTouchPerform(actions);
    });
};
