'use strict';

const addGetCommandHistory = require('lib/commands/utility/getCommandHistory');
const {mkBrowser_} = require('../../../utils');

describe('"getCommandHistory" command', () => {
    it('should add "getCommandHistory" command', () => {
        const browser = mkBrowser_();

        addGetCommandHistory(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getCommandHistory', sinon.match.func);
    });

    it('should return recent command history list', async () => {
        const browser = mkBrowser_();
        browser.commandList = ['init', 'url', 'end'];

        addGetCommandHistory(browser);
        const newCommandList = await browser.getCommandHistory();

        assert.deepEqual(newCommandList, ['init', 'url']);
    });
});
