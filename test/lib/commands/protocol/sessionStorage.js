'use strict';

const addSessionStorage = require('lib/commands/protocol/sessionStorage');
const {mkBrowser_} = require('../../../utils');

describe('"sessionStorage" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    it('should add "sessionStorage" command', () => {
        addSessionStorage(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'sessionStorage', sinon.match.func);
    });

    it('should throw error if passed method is not available', async () => {
        addSessionStorage(browser);

        await assert.isRejected(
            browser.sessionStorage('foo'),
            'Invalid method "foo" does not match on available methods: GET, POST, DELETE'
        );
    });

    describe('get session storage keys', () => {
        it('should get all keys if only method is passed', async () => {
            addSessionStorage(browser);

            await browser.sessionStorage('GET');

            assert.calledOnceWithExactly(browser.getSessionStorage);
        });

        it('should get only one key if method and key is passed', async () => {
            addSessionStorage(browser);

            await browser.sessionStorage('GET', 'some-key');

            assert.calledOnceWithExactly(browser.getSessionStorageItem, 'some-key');
        });
    });

    describe('delete session storage keys', () => {
        it('should delete all keys if only method is passed', async () => {
            addSessionStorage(browser);

            await browser.sessionStorage('DELETE');

            assert.calledOnceWithExactly(browser.clearSessionStorage);
        });

        it('should delete only one key if method and key is passed', async () => {
            addSessionStorage(browser);

            await browser.sessionStorage('DELETE', 'some-key');

            assert.calledOnceWithExactly(browser.deleteSessionStorageItem, 'some-key');
        });
    });

    describe('set sessions storage keys', () => {
        it('should set passed key and value', async () => {
            addSessionStorage(browser);

            await browser.sessionStorage('POST', {key: 'some-key', value: 'some-value'});

            assert.calledOnceWithExactly(browser.setSessionStorage, 'some-key', 'some-value');
        });
    });
});
