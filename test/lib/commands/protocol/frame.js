'use strict';

const addFrame = require('lib/commands/protocol/frame');
const {mkBrowser_} = require('../../../utils');

describe('"frame" command', () => {
    it('should add "frame" command', () => {
        const browser = mkBrowser_();

        addFrame(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'frame', sinon.match.func);
    });

    it('should call "switchToFrame" with passed frame id', async () => {
        const browser = mkBrowser_();

        addFrame(browser);
        await browser.frame('.some-frame-id');

        assert.calledOnceWithExactly(browser.switchToFrame, '.some-frame-id');
    });
});
