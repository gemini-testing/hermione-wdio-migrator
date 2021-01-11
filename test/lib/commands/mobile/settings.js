'use strict';

const addSettings = require('lib/commands/mobile/settings');
const {mkBrowser_} = require('../../../utils');

describe('"settings" command', () => {
    it('should add "settings" command', () => {
        const browser = mkBrowser_();

        addSettings(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'settings', sinon.match.func);
    });

    it('should call "updateSettings" if settings are passed', async () => {
        const browser = mkBrowser_();
        const settings = {some: 'settings'};

        addSettings(browser);
        await browser.settings(settings);

        assert.calledOnceWithExactly(browser.updateSettings, settings);
    });

    it('should call "getSettings" if settings are not passed', async () => {
        const browser = mkBrowser_();

        addSettings(browser);
        await browser.settings();

        assert.calledOnceWithExactly(browser.getSettings);
    });
});
