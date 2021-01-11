'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('touch', async function(selector, longClick = false) {
        const touchCommand = longClick ? 'touchLongClick' : 'touchClick';

        const elem = await findElement(this, selector);

        return this[touchCommand](elem.elementId);
    });
};
