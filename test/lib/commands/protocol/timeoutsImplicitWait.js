'use strict';

const addTimeoutsImplicitWait = require('lib/commands/protocol/timeoutsImplicitWait');
const {mkBrowser_} = require('../../../utils');

describe('"timeoutsImplicitWait" command', () => {
    it('should add "timeoutsImplicitWait" command', () => {
        const browser = mkBrowser_();

        addTimeoutsImplicitWait(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'timeoutsImplicitWait', sinon.match.func);
    });

    it('should call "setImplicitTimeout" with passed duration', async () => {
        const browser = mkBrowser_();

        addTimeoutsImplicitWait(browser);
        await browser.timeoutsImplicitWait(100500);

        assert.calledOnceWithExactly(browser.setImplicitTimeout, 100500);
    });
});
