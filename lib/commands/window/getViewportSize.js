'use strict';

const _ = require('lodash');
const getViewportSizeScript = require('../../scripts/getViewportSize');

const AVAILABLE_PROPS = ['width', 'height'];

module.exports = (browser) => {
    browser.addCommand('getViewportSize', async function(prop) {
        const viewportSize = await this.execute(getViewportSizeScript);

        if (_.isString(prop) && AVAILABLE_PROPS.includes(prop)) {
            return viewportSize[prop];
        }

        return {width: viewportSize.width, height: viewportSize.height};
    });
};
