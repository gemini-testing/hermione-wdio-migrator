'use strict';

const addLaunch = require('lib/commands/mobile/launch');
const {mkBrowser_} = require('../../../utils');

describe('"launch" command', () => {
    it('should add "launch" command', () => {
        const browser = mkBrowser_();

        addLaunch(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'launch', sinon.match.func);
    });

    it('should call "launchApp"', async () => {
        const browser = mkBrowser_();

        addLaunch(browser);
        await browser.launch();

        assert.calledOnceWithExactly(browser.launchApp);
    });
});
