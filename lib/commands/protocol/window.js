'use strict';

module.exports = (browser) => {
    browser.addCommand('window', function(name) {
        return name
            ? this.switchToWindow(name)
            : this.closeWindow();
    });
};
