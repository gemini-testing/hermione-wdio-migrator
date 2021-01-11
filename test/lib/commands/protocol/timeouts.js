'use strict';

const addTimeouts = require('lib/commands/protocol/timeouts');
const {mkBrowser_} = require('../../../utils');

describe('"timeouts" command', () => {
    it('should add "timeouts" command', () => {
        const browser = mkBrowser_();

        addTimeouts(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'timeouts', sinon.match.func);
    });

    it('should return current timeouts if type and duration is not passed', async () => {
        const browser = mkBrowser_();

        addTimeouts(browser);
        await browser.timeouts();

        assert.calledOnceWithExactly(browser.getTimeouts);
    });

    it('should set timeouts passed in w3c compatible format', async () => {
        const browser = mkBrowser_();
        const timeouts = {script: 100, pageLoad: 200, implicit: 300};

        addTimeouts(browser);
        await browser.timeouts(timeouts);

        assert.calledOnceWithExactly(browser.setTimeout, timeouts);
    });

    it('should set timeouts passed not in w3c compatible format', async () => {
        const browser = mkBrowser_();

        addTimeouts(browser);
        await browser.timeouts('script', 100);

        assert.calledOnceWithExactly(browser.setTimeout, {script: 100});
    });
});
