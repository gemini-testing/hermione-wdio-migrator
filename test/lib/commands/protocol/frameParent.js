'use strict';

const addFrameParent = require('lib/commands/protocol/frameParent');
const {mkBrowser_} = require('../../../utils');

describe('"frameParent" command', () => {
    it('should add "frameParent" command', () => {
        const browser = mkBrowser_();

        addFrameParent(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'frameParent', sinon.match.func);
    });

    it('should call "switchToParentFrame"', async () => {
        const browser = mkBrowser_();

        addFrameParent(browser);
        await browser.frameParent();

        assert.calledOnceWithExactly(browser.switchToParentFrame);
    });
});
