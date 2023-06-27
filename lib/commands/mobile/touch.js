'use strict';

const findElement = require('../../helpers/findElement');
const getPerformActionId = require('../../helpers/getPerformActionId');
const {LONG_CLICK_DURATION, CLICK_DURATION} = require('../../constants');

module.exports = (browser) => {
    if (browser.isW3C) {
        browser.addCommand('touch', async function(selector, longClick = false) {
            return this.performActions([{
                type: 'pointer',
                id: getPerformActionId(browser),
                parameters: {pointerType: 'touch'},
                actions: [
                    {type: 'pointerMove', duration: 0, origin: await findElement(this, selector), x: 0, y: 0},
                    {type: 'pointerDown', button: 0},
                    {type: 'pause', duration: longClick ? LONG_CLICK_DURATION : CLICK_DURATION},
                    {type: 'pointerUp', button: 0}
                ]
            }]);
        });
    } else {
        browser.addCommand('touch', async function(selector, longClick = false) {
            const touchCommand = longClick ? 'touchLongClick' : 'touchClick';

            const elem = await findElement(this, selector);

            return this[touchCommand](elem.elementId);
        });
    }
};
