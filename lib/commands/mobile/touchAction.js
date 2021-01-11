'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.overwriteCommand('touchAction', async function(origTouchAction, selector, action) {
        if (!action) {
            return origTouchAction(selector);
        }

        const elem = await findElement(this, selector);

        return elem.touchAction(action);
    });
};
