'use strict';

module.exports = (browser) => {
    browser.addCommand('alertText', function(text) {
        return text
            ? this.sendAlertText(text)
            : this.getAlertText();
    });
};
