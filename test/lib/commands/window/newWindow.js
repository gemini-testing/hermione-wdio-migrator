'use strict';

const addNewWindow = require('lib/commands/window/newWindow');
const {mkBrowser_} = require('../../../utils');

describe('"newWindow" command', () => {
    it('should overwrite "newWindow" command', () => {
        const browser = mkBrowser_();

        addNewWindow(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'newWindow', sinon.match.func);
    });

    it('should call original "newWindow" with args passed in old format', async () => {
        const browser = mkBrowser_();
        const origNewWindow = browser.newWindow;

        addNewWindow(browser);
        await browser.newWindow('some-url', 'some-name', 'status=1');

        assert.calledOnceWithExactly(origNewWindow, 'some-url', {windowName: 'some-name', windowFeatures: 'status=1'});
    });

    it('should call original "newWindow" with args passed in new format', async () => {
        const browser = mkBrowser_();
        const origNewWindow = browser.newWindow;

        addNewWindow(browser);
        await browser.newWindow('some-url', {windowName: 'some-name', windowFeatures: 'status=1'});

        assert.calledOnceWithExactly(origNewWindow, 'some-url', {windowName: 'some-name', windowFeatures: 'status=1'});
    });
});
