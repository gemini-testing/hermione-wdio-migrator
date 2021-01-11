'use strict';

const addSessionStorageSize = require('lib/commands/protocol/sessionStorageSize');
const {mkBrowser_} = require('../../../utils');

describe('"sessionStorageSize" command', () => {
    it('should add "sessionStorageSize" command', () => {
        const browser = mkBrowser_();

        addSessionStorageSize(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'sessionStorageSize', sinon.match.func);
    });

    it('should call "getSessionStorageSize"', async () => {
        const browser = mkBrowser_();

        addSessionStorageSize(browser);
        await browser.sessionStorageSize();

        assert.calledOnceWithExactly(browser.getSessionStorageSize);
    });
});
