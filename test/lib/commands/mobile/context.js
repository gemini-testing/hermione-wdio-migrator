'use strict';

const addContext = require('lib/commands/mobile/context');
const {mkBrowser_} = require('../../../utils');

describe('"context" command', () => {
    it('should add "context" command', () => {
        const browser = mkBrowser_();

        addContext(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'context', sinon.match.func);
    });

    it('should call "getContext" if context name is not passed', async () => {
        const browser = mkBrowser_();

        addContext(browser);
        await browser.context();

        assert.calledOnceWithExactly(browser.getContext);
    });

    it('should call "switchContext" if context name is passed', async () => {
        const browser = mkBrowser_();

        addContext(browser);
        await browser.context('native-ctx');

        assert.calledOnceWithExactly(browser.switchContext, 'native-ctx');
    });
});
