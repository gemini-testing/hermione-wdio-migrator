'use strict';

const getMouseButtonNameNumber = require('../../helpers/getMouseButtonNameNumber');
const getPerformActionId = require('../../helpers/getPerformActionId');

module.exports = (browser) => {
    if (!browser.isW3C) {
        return;
    }

    const commandFn = function(button) {
        return this.performActions([{
            type: 'pointer',
            id: getPerformActionId(browser),
            parameters: {pointerType: 'mouse'},
            actions: [
                {type: 'pointerDown', button: getMouseButtonNameNumber(button)}
            ]
        }]);
    };

    if (!browser.buttonDown) {
        browser.addCommand('buttonDown', commandFn);
    } else {
        browser.overwriteCommand('buttonDown', function(_, button) {
            return commandFn.call(this, button);
        });
    }
};
