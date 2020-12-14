'use strict';

const addWindow = require('lib/commands/protocol/window');
const {mkBrowser_} = require('../../../utils');

describe('"window" command', () => {
    it('should add "window" command', () => {
        const browser = mkBrowser_();

        addWindow(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'window', sinon.match.func);
    });

    it('should call "switchToWindow" if window name is passed', async () => {
        const browser = mkBrowser_();

        addWindow(browser);
        await browser.window('some-window');

        assert.calledOnceWithExactly(browser.switchToWindow, 'some-window');
    });

    it('should call "closeWindow" if window name is not passed', async () => {
        const browser = mkBrowser_();

        addWindow(browser);
        await browser.window();

        assert.calledOnceWithExactly(browser.closeWindow);
    });
});
