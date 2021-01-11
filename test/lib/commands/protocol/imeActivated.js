'use strict';

const addImeActivated = require('lib/commands/protocol/imeActivated');
const {mkBrowser_} = require('../../../utils');

describe('"imeActivated" command', () => {
    it('should add "imeActivated" command', () => {
        const browser = mkBrowser_();

        addImeActivated(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'imeActivated', sinon.match.func);
    });

    it('should call "isIMEActivated"', async () => {
        const browser = mkBrowser_();

        addImeActivated(browser);
        await browser.imeActivated();

        assert.calledOnceWithExactly(browser.isIMEActivated);
    });
});
