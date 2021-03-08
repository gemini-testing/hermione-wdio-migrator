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
        browser.getCookies.resolves([]);

        addGetCookie(browser);
        await browser.getCookie(['name1', 'name2']);

        assert.calledOnceWithExactly(browser.getCookies, ['name1', 'name2']);
    });

    it('should return only one found cookie', async () => {
        const browser = mkBrowser_();
        const foundCookies = [{name: 'name1', value: '100500'}];
        browser.getCookies.withArgs('name1').resolves(foundCookies);

        addGetCookie(browser);
        const result = await browser.getCookie('name1');

        assert.deepEqual(result, foundCookies[0]);
    });

    it('should return all found cookies', async () => {
        const browser = mkBrowser_();
        const foundCookies = [{name: 'name1', value: '100500'}, {name: 'name2', value: '500100'}];
        browser.getCookies.resolves(foundCookies);

        addGetCookie(browser);
        const result = await browser.getCookie();

        assert.deepEqual(result, foundCookies);
    });
});
