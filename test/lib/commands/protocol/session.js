'use strict';

const addSession = require('lib/commands/protocol/session');
const {mkBrowser_} = require('../../../utils');

describe('"session" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    it('should add "session" command', () => {
        addSession(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'session', sinon.match.func);
    });

    it('should throw error if passed operation is not available', async () => {
        addSession(browser);

        await assert.isRejected(
            browser.session('foo'),
            'Invalid operation "foo" does not match on available operations: get, delete'
        );
    });

    describe('get active sessions', () => {
        it('should get all session id session id is not passed', async () => {
            addSession(browser);

            await browser.session();

            assert.calledOnceWithExactly(browser.getSessions);
        });

        it('should get only one active session by passed session id', async () => {
            addSession(browser);

            await browser.session('get', 'session-id');

            assert.calledOnceWithExactly(browser.getSession, 'session-id');
        });
    });

    describe('delete active session', () => {
        it('should delete only one active session by passed session id', async () => {
            addSession(browser);

            await browser.session('delete', 'session-id');

            assert.calledOnceWithExactly(browser.deleteSession, 'session-id');
        });
    });
});
