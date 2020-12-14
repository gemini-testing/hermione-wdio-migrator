'use strict';

const addSessions = require('lib/commands/protocol/sessions');
const {mkBrowser_} = require('../../../utils');

describe('"sessions" command', () => {
    it('should add "sessions" command', () => {
        const browser = mkBrowser_();

        addSessions(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'sessions', sinon.match.func);
    });

    it('should call "getSessions"', async () => {
        const browser = mkBrowser_();

        addSessions(browser);
        await browser.sessions();

        assert.calledOnceWithExactly(browser.getSessions);
    });
});
