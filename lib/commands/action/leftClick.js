'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('leftClick', async function(selector, x, y) {
        const elem = await findElement(this, selector);

        return elem.click({button: 'left', x, y});
    });
};
