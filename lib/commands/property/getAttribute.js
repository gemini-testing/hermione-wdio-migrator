'use strict';

const url = require('url');
const _ = require('lodash');
const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('getAttribute', async function(selector, attributeName) {
        const elem = await findElement(this, selector);
        const attrValue = await elem.getAttribute(attributeName);

        if (!['href', 'action'].includes(attributeName) || !browser.isW3C || !_.isString(attrValue)) {
            return attrValue;
        }

        // hack for geckodriver which does not transform relative url to full
        // issue - https://github.com/mozilla/geckodriver/issues/1861
        return transformRelativeUrlToFull(browser, attrValue);
    });
};

async function transformRelativeUrlToFull(browser, attrValue) {
    if (hasProtocol(attrValue)) {
        return attrValue;
    }

    const currUrl = await browser.getUrl();
    const parsedUrl = url.parse(currUrl);

    if (attrValue.startsWith('//')) {
        return `${parsedUrl.protocol}${attrValue}`;
    }

    return attrValue.startsWith('/')
        ? `${parsedUrl.protocol}//${parsedUrl.hostname}${attrValue}`
        : `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname}${attrValue}`;
}

function hasProtocol(value) {
    return /^[a-z]+:/.test(value);
}
