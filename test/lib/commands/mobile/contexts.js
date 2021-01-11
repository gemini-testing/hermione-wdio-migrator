'use strict';

const addContexts = require('lib/commands/mobile/contexts');
const {mkBrowser_} = require('../../../utils');

describe('"contexts" command', () => {
    it('should add "contexts" command', () => {
        const browser = mkBrowser_();

        addContexts(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'contexts', sinon.match.func);
    });

    it('should call "getContexts"', async () => {
        const browser = mkBrowser_();

        addContexts(browser);
        await browser.contexts();

        assert.calledOnceWithExactly(browser.getContexts);
    });
});
