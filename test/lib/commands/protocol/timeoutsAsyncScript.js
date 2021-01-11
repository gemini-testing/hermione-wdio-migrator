'use strict';

const addTimeoutsAsyncScript = require('lib/commands/protocol/timeoutsAsyncScript');
const {mkBrowser_} = require('../../../utils');

describe('"timeoutsAsyncScript" command', () => {
    it('should add "timeoutsAsyncScript" command', () => {
        const browser = mkBrowser_();

        addTimeoutsAsyncScript(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'timeoutsAsyncScript', sinon.match.func);
    });

    it('should call "setAsyncTimeout" with passed duration', async () => {
        const browser = mkBrowser_();

        addTimeoutsAsyncScript(browser);
        await browser.timeoutsAsyncScript(100500);

        assert.calledOnceWithExactly(browser.setAsyncTimeout, 100500);
    });
});
