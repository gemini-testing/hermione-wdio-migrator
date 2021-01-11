'use strict';

const addDeleteCookie = require('lib/commands/cookie/deleteCookie');
const {mkBrowser_} = require('../../../utils');

describe('"deleteCookie" command', () => {
    it('should overwrite "deleteCookie" command', () => {
        const browser = mkBrowser_();

        addDeleteCookie(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'deleteCookie', sinon.match.func);
    });

    it('should call "deleteAllCookies" if names not passed', async () => {
        const browser = mkBrowser_();
        const origDeleteCookie = browser.deleteCookie;

        addDeleteCookie(browser);
        await browser.deleteCookie();

        assert.calledOnceWithExactly(browser.deleteAllCookies);
        assert.notCalled(origDeleteCookie);
    });

    it('should call "deleteCookies" with passed names', async () => {
        const browser = mkBrowser_();
        const origDeleteCookie = browser.deleteCookie;

        addDeleteCookie(browser);
        await browser.deleteCookie(['name1', 'name2']);

        assert.calledOnceWithExactly(browser.deleteCookies, ['name1', 'name2']);
        assert.notCalled(origDeleteCookie);
    });
});
