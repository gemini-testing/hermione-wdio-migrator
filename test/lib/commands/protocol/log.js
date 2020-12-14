'use strict';

const addLog = require('lib/commands/protocol/log');
const {mkBrowser_} = require('../../../utils');

describe('"log" command', () => {
    it('should add "log" command', () => {
        const browser = mkBrowser_();

        addLog(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'log', sinon.match.func);
    });

    it('should call "getLogs" with pass log type', async () => {
        const browser = mkBrowser_();

        addLog(browser);
        await browser.log('some-log-type');

        assert.calledOnceWithExactly(browser.getLogs, 'some-log-type');
    });
});
