'use strict';

const addInit = require('lib/commands/protocol/init');
const {mkBrowser_} = require('../../../utils');

describe('"init" command', () => {
    it('should add "init" command', () => {
        const browser = mkBrowser_();

        addInit(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'init', sinon.match.func);
    });

    it('should call "newSession" with passed desired capabilities', async () => {
        const browser = mkBrowser_();
        const desiredCapabilities = {browserName: 'chrome'};

        addInit(browser);
        await browser.init(desiredCapabilities);

        assert.calledOnceWithExactly(browser.newSession, desiredCapabilities);
    });
});
