'use strict';

module.exports = (browser) => {
    browser.addCommand('actions', function(actions) {
        return this.performActions(actions);
    });
};
