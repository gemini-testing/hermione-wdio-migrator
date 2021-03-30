'use strict';

const getMouseButtonNameNumber = require('../../helpers/getMouseButtonNameNumber');
const getPerformActionId = require('../../helpers/getPerformActionId');

module.exports = (browser) => {
    if (!browser.isW3C || browser.buttonUp) {
        return;
    }

    browser.addCommand('buttonUp', function(button) {
        return this.performActions([{
            type: 'pointer',
            id: getPerformActionId(browser),
            parameters: {pointerType: 'mouse'},
            actions: [
                {type: 'pointerUp', button: getMouseButtonNameNumber(button)}
            ]
        }]);
    });
};
