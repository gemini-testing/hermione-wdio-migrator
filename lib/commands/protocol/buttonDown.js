'use strict';

const getMouseButtonNameNumber = require('../../helpers/getMouseButtonNameNumber');
const getPerformActionId = require('../../helpers/getPerformActionId');

module.exports = (browser) => {
    if (!browser.isW3C || browser.buttonDown) {
        return;
    }

    browser.addCommand('buttonDown', function(button) {
        return this.performActions([{
            type: 'pointer',
            id: getPerformActionId(browser),
            parameters: {pointerType: 'mouse'},
            actions: [
                {type: 'pointerDown', button: getMouseButtonNameNumber(button)}
            ]
        }]);
    });
};
