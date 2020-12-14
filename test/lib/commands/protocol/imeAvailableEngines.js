'use strict';

const addImeAvailableEngines = require('lib/commands/protocol/imeAvailableEngines');
const {mkBrowser_} = require('../../../utils');

describe('"imeAvailableEngines" command', () => {
    it('should add "imeAvailableEngines" command', () => {
        const browser = mkBrowser_();

        addImeAvailableEngines(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'imeAvailableEngines', sinon.match.func);
    });

    it('should call "getAvailableEngines"', async () => {
        const browser = mkBrowser_();

        addImeAvailableEngines(browser);
        await browser.imeAvailableEngines();

        assert.calledOnceWithExactly(browser.getAvailableEngines);
    });
});
