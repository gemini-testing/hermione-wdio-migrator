'use strict';

module.exports = (browser) => {
    browser.addCommand('frameParent', function() {
        return this.switchToParentFrame();
    });
};
