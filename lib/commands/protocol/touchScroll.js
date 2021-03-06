'use strict';

const _ = require('lodash');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'touchScroll', function(origTouchScroll, elementId, xOffset, yOffset) {
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
