'use strict';

const findElement = require('../../helpers/findElement');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'touchAction', async function(origTouchAction, selector, action) {
        if (!action) {
            return origTouchAction(selector);
        }

        const elem = await findElement(this, selector);

        return elem.touchAction(action);
    });
};
