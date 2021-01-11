'use strict';

module.exports = (browser) => {
    browser.addCommand('getCommandHistory', async function() {
        return this.commandList.slice(0, -1);
    });
};
