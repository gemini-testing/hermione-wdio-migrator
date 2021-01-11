'use strict';

const addGetCurrentDeviceActivity = require('lib/commands/mobile/getCurrentDeviceActivity');
const {mkBrowser_} = require('../../../utils');

describe('"getCurrentDeviceActivity" command', () => {
    it('should add "getCurrentDeviceActivity" command', () => {
        const browser = mkBrowser_();

        addGetCurrentDeviceActivity(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getCurrentDeviceActivity', sinon.match.func);
    });

    it('should call "getCurrentActivity"', async () => {
        const browser = mkBrowser_();

        addGetCurrentDeviceActivity(browser);
        await browser.getCurrentDeviceActivity();

        assert.calledOnceWithExactly(browser.getCurrentActivity);
    });
});
