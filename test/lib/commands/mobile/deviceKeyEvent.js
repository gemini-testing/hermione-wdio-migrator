'use strict';

const addDeviceKeyEvent = require('lib/commands/mobile/deviceKeyEvent');
const {mkBrowser_} = require('../../../utils');

describe('"deviceKeyEvent" command', () => {
    it('should add "deviceKeyEvent" command', () => {
        const browser = mkBrowser_();

        addDeviceKeyEvent(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'deviceKeyEvent', sinon.match.func);
    });

    it('should call "sendKeyEvent" with key code', async () => {
        const browser = mkBrowser_();

        addDeviceKeyEvent(browser);
        await browser.deviceKeyEvent('some-code');

        assert.calledOnceWithExactly(browser.sendKeyEvent, 'some-code');
    });
});
