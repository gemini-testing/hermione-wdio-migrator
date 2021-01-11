'use strict';

const addGetAppStrings = require('lib/commands/mobile/getAppStrings');
const {mkBrowser_} = require('../../../utils');

describe('"getAppStrings" command', () => {
    it('should add "getAppStrings" command', () => {
        const browser = mkBrowser_();

        addGetAppStrings(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getAppStrings', sinon.match.func);
    });

    it('should call "getStrings" with language and string file', async () => {
        const browser = mkBrowser_();

        addGetAppStrings(browser);
        await browser.getAppStrings('some-lang');

        assert.calledOnceWithExactly(browser.getStrings, 'some-lang');
    });
});
