'use strict';

const url = require('url');
const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('getAttribute', async function(selector, attributeName) {
        const elem = await findElement(this, selector);
        const attrValue = await elem.getAttribute(attributeName);

        if (!['href', 'action'].includes(attributeName) || !browser.isW3C) {
            return attrValue;
        }

        // hack for geckodriver which does not transform relative url to full
        // issue - https://github.com/mozilla/geckodriver/issues/1861
        return transformRelativeUrlToFull(browser, attrValue);
    });
};

async function transformRelativeUrlToFull(browser, attrValue) {
    if (attrValue.startsWith('//')) {
        return `https:${attrValue}`;
    }

    if (attrValue.startsWith('/')) {
        const currUrl = await browser.getUrl();
        const parsedUrl = url.parse(currUrl);

        return `${parsedUrl.protocol}//${parsedUrl.hostname}${attrValue}`;
    }

    return attrValue;
}
