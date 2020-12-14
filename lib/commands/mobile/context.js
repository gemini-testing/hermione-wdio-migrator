'use strict';

module.exports = (browser) => {
    browser.addCommand('context', function(name) {
        return name
            ? this.switchContext(name)
            : this.getContext();
    });
};
