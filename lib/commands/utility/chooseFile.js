'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('chooseFile', async function(selector, localPath) {
        const remotePath = await this.uploadFile(localPath);
        const elem = await findElement(this, selector);

        return elem.setValue(remotePath);
    });
};
