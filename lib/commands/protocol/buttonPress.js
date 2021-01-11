'use strict';

module.exports = (browser) => {
    browser.addCommand('buttonPress', function(button) {
        return this.buttonDown(button).buttonUp(button);
    });
};
