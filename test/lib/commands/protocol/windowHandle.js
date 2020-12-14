'use strict';

const addWindowHandle = require('lib/commands/protocol/windowHandle');
const {mkBrowser_} = require('../../../utils');

describe('"windowHandle" command', () => {
    it('should add "windowHandle" command', () => {
        const browser = mkBrowser_();

        addWindowHandle(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'windowHandle', sinon.match.func);
    });

    it('should call "getWindowHandle"', async () => {
        const browser = mkBrowser_();

        addWindowHandle(browser);
        await browser.windowHandle();

        assert.calledOnceWithExactly(browser.getWindowHandle);
    });
});
