'use strict';

const addImeActivate = require('lib/commands/protocol/imeActivate');
const {mkBrowser_} = require('../../../utils');

describe('"imeActivate" command', () => {
    it('should add "imeActivate" command', () => {
        const browser = mkBrowser_();

        addImeActivate(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'imeActivate', sinon.match.func);
    });

    it('should call "activateIME" with passed engine', async () => {
        const browser = mkBrowser_();

        addImeActivate(browser);
        await browser.imeActivate('some-engine');

        assert.calledOnceWithExactly(browser.activateIME, 'some-engine');
    });
});
