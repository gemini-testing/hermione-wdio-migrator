'use strict';

const addWaitUntil = require('lib/commands/utility/waitUntil');
const {mkBrowser_} = require('../../../utils');

describe('"waitUntil" command', () => {
    it('should overwrite "waitUntil" command', () => {
        const browser = mkBrowser_();

        addWaitUntil(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'waitUntil', sinon.match.func);
    });

    it('should call original "waitUntil" with args passed in old format', async () => {
        const browser = mkBrowser_();
        const origWaitUntil = browser.waitUntil;
        const condition = sinon.spy();

        addWaitUntil(browser);
        await browser.waitUntil(condition, 100, 'some-msg', 200);

        assert.calledOnceWithExactly(origWaitUntil, condition, {timeout: 100, timeoutMsg: 'some-msg', interval: 200});
    });

    it('should call original "waitUntil" with args passed in new format', async () => {
        const browser = mkBrowser_();
        const origWaitUntil = browser.waitUntil;
        const condition = sinon.spy();

        addWaitUntil(browser);
        await browser.waitUntil(condition, {timeout: 100, timeoutMsg: 'some-msg', interval: 200});

        assert.calledOnceWithExactly(origWaitUntil, condition, {timeout: 100, timeoutMsg: 'some-msg', interval: 200});
    });
});
