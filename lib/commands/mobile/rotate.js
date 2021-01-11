'use strict';

module.exports = (browser) => {
    browser.addCommand('rotate', function(x, y, radius, rotation, touchCount, duration) {
        return this.rotateDevice(x, y, radius, rotation, touchCount, duration);
    });
};
