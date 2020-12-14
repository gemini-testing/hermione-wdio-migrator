'use strict';

const addActions = require('lib/commands/protocol/actions');
const {mkBrowser_} = require('../../../utils');

describe('"actions" command', () => {
    it('should add "actions" command', () => {
        const browser = mkBrowser_();

        addActions(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'actions', sinon.match.func);
    });

    it('should call "performActions"', async () => {
        const browser = mkBrowser_();

        addActions(browser);
        await browser.actions({some: 'action'});

        assert.calledOnceWithExactly(browser.performActions, {some: 'action'});
    });
});
