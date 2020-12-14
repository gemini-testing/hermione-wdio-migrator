'use strict';

const addScreenshot = require('lib/commands/protocol/screenshot');
const {mkBrowser_} = require('../../../utils');

describe('"screenshot" command', () => {
    it('should add "screenshot" command', () => {
        const browser = mkBrowser_();

        addScreenshot(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'screenshot', sinon.match.func);
    });

    it('should call "takeScreenshot" with passed element and offsets', async () => {
        const browser = mkBrowser_();

        addScreenshot(browser);
        await browser.screenshot();

        assert.calledOnceWithExactly(browser.takeScreenshot);
    });
});
