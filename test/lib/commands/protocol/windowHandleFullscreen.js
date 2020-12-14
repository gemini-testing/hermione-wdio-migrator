'use strict';

const addWindowHandleFullscreen = require('lib/commands/protocol/windowHandleFullscreen');
const {mkBrowser_} = require('../../../utils');

describe('"windowHandleFullscreen" command', () => {
    it('should add "windowHandleFullscreen" command', () => {
        const browser = mkBrowser_();

        addWindowHandleFullscreen(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'windowHandleFullscreen', sinon.match.func);
    });

    it('should call "fullscreenWindow"', async () => {
        const browser = mkBrowser_();

        addWindowHandleFullscreen(browser);
        await browser.windowHandleFullscreen();

        assert.calledOnceWithExactly(browser.fullscreenWindow);
    });
});
