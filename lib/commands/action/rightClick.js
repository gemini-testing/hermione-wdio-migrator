'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('rightClick', async function(selector, x, y) {
        const elem = await findElement(this, selector);

        return elem.click({button: 'right', x, y});
    });
};
