'use strict';

const addSetCookie = require('lib/commands/cookie/setCookie');
const {mkBrowser_} = require('../../../utils');

describe('"setCookie" command', () => {
    it('should add "setCookie" command', () => {
        const browser = mkBrowser_();

        addSetCookie(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'setCookie', sinon.match.func);
    });

    it('should call "setCookies" with passed cookies', async () => {
        const browser = mkBrowser_();
        const cookies = [
            {name: 'first', value: 'one'},
            {name: 'second', value: 'two'}
        ];

        addSetCookie(browser);
        await browser.setCookie(cookies);

        assert.calledOnceWithExactly(browser.setCookies, cookies);
    });
});
