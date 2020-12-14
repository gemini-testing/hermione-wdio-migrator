'use strict';

const addSaveScreenshot = require('lib/commands/utility/saveScreenshot');
const {mkBrowser_} = require('../../../utils');

describe('"saveScreenshot" command', () => {
    it('should overwrite "saveScreenshot" command', () => {
        const browser = mkBrowser_();

        addSaveScreenshot(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'saveScreenshot', sinon.match.func);
    });

    it('should call original "saveScreenshot" with passed filename', async () => {
        const browser = mkBrowser_();
        const origSaveScreenshot = browser.saveScreenshot;

        addSaveScreenshot(browser);
        await browser.saveScreenshot('./screen.png');

        assert.calledOnceWithExactly(origSaveScreenshot, './screen.png');
    });

    it('should call "takeScreenshot" if filename is not passed', async () => {
        const browser = mkBrowser_();
        const origSaveScreenshot = browser.saveScreenshot;

        addSaveScreenshot(browser);
        await browser.saveScreenshot();

        assert.calledOnceWithExactly(browser.takeScreenshot);
        assert.notCalled(origSaveScreenshot);
    });
});
