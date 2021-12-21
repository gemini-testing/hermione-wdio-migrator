'use strict';

module.exports = (browser) => {
    browser.addCommand('buttonPress', async function(button) {
        await this.buttonDown(button);
        await this.buttonUp(button);
    });
};
