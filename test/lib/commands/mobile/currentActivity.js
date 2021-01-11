'use strict';

const addCurrentActivity = require('lib/commands/mobile/currentActivity');
const {mkBrowser_} = require('../../../utils');

describe('"currentActivity" command', () => {
    it('should add "currentActivity" command', () => {
        const browser = mkBrowser_();

        addCurrentActivity(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'currentActivity', sinon.match.func);
    });

    it('should call "getCurrentActivity"', async () => {
        const browser = mkBrowser_();

        addCurrentActivity(browser);
        await browser.currentActivity();

        assert.calledOnceWithExactly(browser.getCurrentActivity);
    });
});
