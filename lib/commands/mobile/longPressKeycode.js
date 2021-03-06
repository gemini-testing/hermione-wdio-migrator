'use strict';

module.exports = (browser) => {
    browser.addCommand('longPressKeycode', function(...args) {
        const intArgs = args.map((arg) => parseInt(arg));

        return this.longPressKeyCode(...intArgs);
    });
};
