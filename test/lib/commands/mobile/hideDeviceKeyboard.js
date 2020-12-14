'use strict';

const addHideDeviceKeyboard = require('lib/commands/mobile/hideDeviceKeyboard');
const {mkBrowser_} = require('../../../utils');

describe('"hideDeviceKeyboard" command', () => {
    it('should add "hideDeviceKeyboard" command', () => {
        const browser = mkBrowser_();

        addHideDeviceKeyboard(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'hideDeviceKeyboard', sinon.match.func);
    });

    it('should call "hideKeyboard" with correct args', async () => {
        const browser = mkBrowser_();

        addHideDeviceKeyboard(browser);
        await browser.hideDeviceKeyboard('strategy');

        assert.calledOnceWithExactly(browser.hideKeyboard, 'strategy');
    });
});
