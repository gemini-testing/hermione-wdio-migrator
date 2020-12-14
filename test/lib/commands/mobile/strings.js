'use strict';

const addStrings = require('lib/commands/mobile/strings');
const {mkBrowser_} = require('../../../utils');

describe('"strings" command', () => {
    it('should add "strings" command', () => {
        const browser = mkBrowser_();

        addStrings(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'strings', sinon.match.func);
    });

    it('should call "getStrings" with language', async () => {
        const browser = mkBrowser_();

        addStrings(browser);
        await browser.strings('some-lang');

        assert.calledOnceWithExactly(browser.getStrings, 'some-lang');
    });
});
