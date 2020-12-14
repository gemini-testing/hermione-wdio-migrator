'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const getViewportSizeScript = require('../../scripts/getViewportSize');

const MAX_TRIES = 5;

module.exports = (browser) => {
    browser.addCommand('setViewportSize', async function(size, type = true) {
        if (!_.isPlainObject(size) || !_.isNumber(size.width) || !_.isNumber(size.height) || !_.isBoolean(type)) {
            throw new TypeError('number or type of arguments don\'t agree with "setViewportSize" command');
        }

        return type ? _setViewportSize.call(this, size) : this.setWindowSize(size.width, size.height);
    });
};

async function _setViewportSize(size, retryNum = 0) {
    const [windowSize, viewportSize] = await Promise.all([this.getWindowSize(), this.execute(getViewportSizeScript)]);

    const widthDiff = windowSize.width - viewportSize.width;
    const heightDiff = windowSize.height - viewportSize.height;

    // change window size with indent
    await this.setWindowSize(size.width + widthDiff, size.height + heightDiff);

    const newViewportSize = await this.execute(getViewportSizeScript);

    if (retryNum < MAX_TRIES && (newViewportSize.width !== size.width || newViewportSize.height !== size.height)) {
        await _setViewportSize.call(this, size, ++retryNum);
    }
}
