'use strict';

module.exports = (browser) => {
    browser.addCommand('reload', async function() {
        return this.reloadSession();
    });
};
