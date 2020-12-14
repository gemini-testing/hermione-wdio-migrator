'use strict';

module.exports = (browser) => {
    browser.addCommand('settings', function(settings) {
        return settings
            ? this.updateSettings(settings)
            : this.getSettings();
    });
};
