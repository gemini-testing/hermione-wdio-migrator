'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('getHTML', async function(selector, includeSelectorTag = true) {
        const elem = await findElement(this, selector);

        return elem.getHTML(includeSelectorTag);
    });
};
