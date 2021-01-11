'use strict';

const addImeDeactivated = require('lib/commands/protocol/imeDeactivated');
const {mkBrowser_} = require('../../../utils');

describe('"imeDeactivated" command', () => {
    it('should add "imeDeactivated" command', () => {
        const browser = mkBrowser_();

        addImeDeactivated(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'imeDeactivated', sinon.match.func);
    });

    it('should call "deactivateIME"', async () => {
        const browser = mkBrowser_();

        addImeDeactivated(browser);
        await browser.imeDeactivated();

        assert.calledOnceWithExactly(browser.deactivateIME);
    });
});
