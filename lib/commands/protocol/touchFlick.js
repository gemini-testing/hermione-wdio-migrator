'use strict';

const _ = require('lodash');
const overwriteExistingCommand = require('../../helpers/overwriteExistingCommand');

module.exports = (browser) => {
    overwriteExistingCommand(browser, 'touchFlick', function(origTouchFlick, elementId, xOffset, yOffset, speed, xSpeed, ySpeed) {
        if (_.isNumber(elementId)) {
            const xOffsetTemp = xOffset;
            const yOffsetTemp = yOffset;

            xOffset = elementId;
            yOffset = xOffsetTemp;
            elementId = yOffsetTemp;
        }

        return origTouchFlick(xOffset, yOffset, elementId, speed, xSpeed, ySpeed);
    });
};
