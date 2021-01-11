'use strict';

const _ = require('lodash');

module.exports = (browser) => {
    browser.overwriteCommand('touchScroll', function(origTouchScroll, elementId, xOffset, yOffset) {
        if (_.isNumber(elementId)) {
            const xOffsetTemp = xOffset;
            const yOffsetTemp = yOffset;

            xOffset = elementId;
            yOffset = xOffsetTemp;
            elementId = yOffsetTemp;
        }

        return origTouchScroll(xOffset, yOffset, elementId);
    });
};
