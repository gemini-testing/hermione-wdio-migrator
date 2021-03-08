'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"waitUntil" command', () => {
    let browser, overwriteExistingCommand, overwriteWaitUntil;

    beforeEach(() => {
        browser = mkBrowser_();
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteWaitUntil = proxyquire('lib/commands/utility/waitUntil', {
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite existing "waitUntil" command', () => {
        overwriteWaitUntil(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'waitUntil', sinon.match.func);
    });

    it('should call original "waitUntil" with args passed in old format', async () => {
        const origWaitUntil = browser.waitUntil;
        const condition = sinon.spy();

        overwriteWaitUntil(browser);
        await browser.waitUntil(condition, 100, 'some-msg', 200);

        assert.calledOnceWithExactly(origWaitUntil, condition, {timeout: 100, timeoutMsg: 'some-msg', interval: 200});
    });

    it('should call original "waitUntil" with args passed in new format', async () => {
        const origWaitUntil = browser.waitUntil;
        const condition = sinon.spy();

        overwriteWaitUntil(browser);
        await browser.waitUntil(condition, {timeout: 100, timeoutMsg: 'some-msg', interval: 200});

        assert.calledOnceWithExactly(origWaitUntil, condition, {timeout: 100, timeoutMsg: 'some-msg', interval: 200});
    });
});
