'use strict';

const addLogTypes = require('lib/commands/protocol/logTypes');
const {mkBrowser_} = require('../../../utils');

describe('"logTypes" command', () => {
    it('should add "logTypes" command', () => {
        const browser = mkBrowser_();

        addLogTypes(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'logTypes', sinon.match.func);
    });

    it('should call "getLogTypes"', async () => {
        const browser = mkBrowser_();

        addLogTypes(browser);
        await browser.logTypes();

        assert.calledOnceWithExactly(browser.getLogTypes);
    });
});
