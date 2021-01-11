'use strict';

module.exports = (browser) => {
    browser.addCommand('touchMultiPerform', function(actions, elementId) {
        return this.multiTouchPerform(actions, elementId);
    });
};
