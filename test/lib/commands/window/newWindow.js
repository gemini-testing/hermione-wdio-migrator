'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"newWindow" command', () => {
    let browser, overwriteExistingCommand, overwriteNewWindow;

    beforeEach(() => {
        browser = mkBrowser_();
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteNewWindow = proxyquire('lib/commands/window/newWindow', {
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite "newWindow" command', () => {
        overwriteNewWindow(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'newWindow', sinon.match.func);
    });

    it('should call original "newWindow" with args passed in old format', async () => {
        const origNewWindow = browser.newWindow;

        overwriteNewWindow(browser);
        await browser.newWindow('some-url', 'some-name', 'status=1');

        assert.calledOnceWithExactly(origNewWindow, 'some-url', {windowName: 'some-name', windowFeatures: 'status=1'});
    });

    it('should call original "newWindow" with args passed in new format', async () => {
        const origNewWindow = browser.newWindow;

        overwriteNewWindow(browser);
        await browser.newWindow('some-url', {windowName: 'some-name', windowFeatures: 'status=1'});

        assert.calledOnceWithExactly(origNewWindow, 'some-url', {windowName: 'some-name', windowFeatures: 'status=1'});
    });
});
