'use strict';

const addCookie = require('lib/commands/protocol/cookie');
const {mkBrowser_} = require('../../../utils');

describe('"cookie" command', () => {
    it('should add "cookie" command', () => {
        const browser = mkBrowser_();

        addCookie(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'cookie', sinon.match.func);
    });

    it('should delete all cookies', async () => {
        const browser = mkBrowser_();

        addCookie(browser);
        await browser.cookie('delete');

        assert.calledOnceWithExactly(browser.deleteAllCookies);
    });

    it('should delete passed cookie', async () => {
        const browser = mkBrowser_();

        addCookie(browser);
        await browser.cookie('delete', 'cookie');

        assert.calledOnceWithExactly(browser.deleteCookie, 'cookie');
    });

    it('should get all cookies', async () => {
        const browser = mkBrowser_();

        addCookie(browser);
        await browser.cookie('some-method');

        assert.calledOnceWithExactly(browser.getAllCookies);
    });

    it('should set passed cookie', async () => {
        const browser = mkBrowser_();

        addCookie(browser);
        await browser.cookie('some-method', 'cookie');

        assert.calledOnceWithExactly(browser.addCookie, 'cookie');
    });
});
