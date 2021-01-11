'use strict';

module.exports = (browser) => {
    browser.addCommand('deviceKeyEvent', function(keycode) {
        return this.sendKeyEvent(keycode);
    });
};
