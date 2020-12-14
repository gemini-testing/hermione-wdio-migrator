'use strict';

const _ = require('lodash');
const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('dragAndDrop', async function(selector, target) {
        const srcElem = await findElement(this, selector);
        const dest = await (_.isString(target) ? findElement(this, target) : target);

        return srcElem.dragAndDrop(dest);
    });
};
