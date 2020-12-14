'use strict';

const addGetCookie = require('lib/commands/cookie/getCookie');
const {mkBrowser_} = require('../../../utils');

describe('"getCookie" command', () => {
    it('should add "getCookie" command', () => {
        const browser = mkBrowser_();

        addGetCookie(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getCookie', sinon.match.func);
    });

    it('should call "getCookies" with passed names', async () => {
        const browser = mkBrowser_();

        addGetCookie(browser);
        await browser.getCookie(['name1', 'name2']);

        assert.calledOnceWithExactly(browser.getCookies, ['name1', 'name2']);
    });
});
