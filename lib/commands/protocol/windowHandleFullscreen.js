'use strict';

module.exports = (browser) => {
    browser.addCommand('windowHandleFullscreen', function() {
        return this.fullscreenWindow();
    });
};
