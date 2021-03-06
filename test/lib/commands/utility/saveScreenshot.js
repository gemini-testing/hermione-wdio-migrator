'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"saveScreenshot" command', () => {
    let browser, overwriteExistingCommand, overwriteSaveScreenshot;

    beforeEach(() => {
        browser = mkBrowser_();
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteSaveScreenshot = proxyquire('lib/commands/utility/saveScreenshot', {
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite existing "saveScreenshot" command', () => {
        overwriteSaveScreenshot(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'saveScreenshot', sinon.match.func);
    });

    it('should call original "saveScreenshot" with passed filename', async () => {
        const origSaveScreenshot = browser.saveScreenshot;

        overwriteSaveScreenshot(browser);
        await browser.saveScreenshot('./screen.png');

        assert.calledOnceWithExactly(origSaveScreenshot, './screen.png');
    });

    it('should call "takeScreenshot" if filename is not passed', async () => {
        const origSaveScreenshot = browser.saveScreenshot;

        overwriteSaveScreenshot(browser);
        await browser.saveScreenshot();

        assert.calledOnceWithExactly(browser.takeScreenshot);
        assert.notCalled(origSaveScreenshot);
    });
});
