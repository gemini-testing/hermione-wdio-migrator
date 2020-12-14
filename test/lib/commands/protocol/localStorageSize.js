'use strict';

const addLocalStorageSize = require('lib/commands/protocol/localStorageSize');
const {mkBrowser_} = require('../../../utils');

describe('"localStorageSize" command', () => {
    it('should add "localStorageSize" command', () => {
        const browser = mkBrowser_();

        addLocalStorageSize(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'localStorageSize', sinon.match.func);
    });

    it('should call "getLocalStorageSize"', async () => {
        const browser = mkBrowser_();

        addLocalStorageSize(browser);
        await browser.localStorageSize();

        assert.calledOnceWithExactly(browser.getLocalStorageSize);
    });
});
