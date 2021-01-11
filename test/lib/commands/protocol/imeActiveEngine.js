'use strict';

const addImeActiveEngine = require('lib/commands/protocol/imeActiveEngine');
const {mkBrowser_} = require('../../../utils');

describe('"imeActiveEngine" command', () => {
    it('should add "imeActiveEngine" command', () => {
        const browser = mkBrowser_();

        addImeActiveEngine(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'imeActiveEngine', sinon.match.func);
    });

    it('should call "getActiveEngine"', async () => {
        const browser = mkBrowser_();

        addImeActiveEngine(browser);
        await browser.imeActiveEngine();

        assert.calledOnceWithExactly(browser.getActiveEngine);
    });
});
