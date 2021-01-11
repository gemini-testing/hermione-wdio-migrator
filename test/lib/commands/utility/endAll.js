'use strict';

const addEndAll = require('lib/commands/utility/endAll');
const {mkBrowser_} = require('../../../utils');

describe('"endAll" command', () => {
    it('should add "endAll" command', () => {
        const browser = mkBrowser_();

        addEndAll(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'endAll', sinon.match.func);
    });

    it('should delete all available sessions', async () => {
        const browser = mkBrowser_();
        browser.getSessions.resolves([{id: 1}, {id: 2}]);

        addEndAll(browser);
        await browser.endAll();

        assert.calledTwice(browser.deleteSession);
        assert.calledWithExactly(browser.deleteSession.firstCall, 1);
        assert.calledWithExactly(browser.deleteSession.secondCall, 2);
    });
});
