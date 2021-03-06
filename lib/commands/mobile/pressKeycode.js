'use strict';

module.exports = (browser) => {
    browser.addCommand('pressKeycode', function(...args) {
        const intArgs = args.map((arg) => parseInt(arg));

        return this.pressKeyCode(...intArgs);
    });
};
