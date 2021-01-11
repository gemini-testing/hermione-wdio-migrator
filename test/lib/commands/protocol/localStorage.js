'use strict';

const addLocalStorage = require('lib/commands/protocol/localStorage');
const {mkBrowser_} = require('../../../utils');

describe('"localStorage" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    it('should add "localStorage" command', () => {
        addLocalStorage(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'localStorage', sinon.match.func);
    });

    it('should throw error if passed method is not available', async () => {
        addLocalStorage(browser);

        await assert.isRejected(
            browser.localStorage('foo'),
            'Invalid method "foo" does not match on available methods: GET, POST, DELETE'
        );
    });

    describe('get local storage keys', () => {
        it('should get all keys if only method is passed', async () => {
            addLocalStorage(browser);

            await browser.localStorage('GET');

            assert.calledOnceWithExactly(browser.getLocalStorage);
        });

        it('should get only one key if method and key is passed', async () => {
            addLocalStorage(browser);

            await browser.localStorage('GET', 'some-key');

            assert.calledOnceWithExactly(browser.getLocalStorageItem, 'some-key');
        });
    });

    describe('delete local storage keys', () => {
        it('should delete all keys if only method is passed', async () => {
            addLocalStorage(browser);

            await browser.localStorage('DELETE');

            assert.calledOnceWithExactly(browser.clearLocalStorage);
        });

        it('should delete only one key if method and key is passed', async () => {
            addLocalStorage(browser);

            await browser.localStorage('DELETE', 'some-key');

            assert.calledOnceWithExactly(browser.deleteLocalStorageItem, 'some-key');
        });
    });

    describe('set local storage keys', () => {
        it('should set passed key and value', async () => {
            addLocalStorage(browser);

            await browser.localStorage('POST', {key: 'some-key', value: 'some-value'});

            assert.calledOnceWithExactly(browser.setLocalStorage, 'some-key', 'some-value');
        });
    });
});
