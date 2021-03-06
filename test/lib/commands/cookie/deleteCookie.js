'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"deleteCookie" command', () => {
    let browser, overwriteExistingCommand, overwriteDeleteCookie;

    beforeEach(() => {
        browser = mkBrowser_();
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteDeleteCookie = proxyquire('lib/commands/cookie/deleteCookie', {
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite existing "deleteCookie" command', () => {
        overwriteDeleteCookie(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'deleteCookie', sinon.match.func);
    });

    it('should call "deleteAllCookies" if names not passed', async () => {
        const origDeleteCookie = browser.deleteCookie;

        overwriteDeleteCookie(browser);
        await browser.deleteCookie();

        assert.calledOnceWithExactly(browser.deleteAllCookies);
        assert.notCalled(origDeleteCookie);
    });

    it('should call "deleteCookies" with passed names', async () => {
        const origDeleteCookie = browser.deleteCookie;

        overwriteDeleteCookie(browser);
        await browser.deleteCookie(['name1', 'name2']);

        assert.calledOnceWithExactly(browser.deleteCookies, ['name1', 'name2']);
        assert.notCalled(origDeleteCookie);
    });
});
