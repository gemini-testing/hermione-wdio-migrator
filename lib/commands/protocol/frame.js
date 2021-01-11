'use strict';

module.exports = (browser) => {
    browser.addCommand('frame', function(id) {
        return this.switchToFrame(id);
    });
};
