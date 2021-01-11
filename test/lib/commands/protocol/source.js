'use strict';

const addSource = require('lib/commands/protocol/source');
const {mkBrowser_} = require('../../../utils');

describe('"source" command', () => {
    it('should add "source" command', () => {
        const browser = mkBrowser_();

        addSource(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'source', sinon.match.func);
    });

    it('should call "getPageSource"', async () => {
        const browser = mkBrowser_();

        addSource(browser);
        await browser.source();

        assert.calledOnceWithExactly(browser.getPageSource);
    });
});
