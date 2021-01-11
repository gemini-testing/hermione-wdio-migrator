'use strict';

const addPerformMultiAction = require('lib/commands/mobile/performMultiAction');
const {mkBrowser_} = require('../../../utils');

describe('"performMultiAction" command', () => {
    it('should add "performMultiAction" command', () => {
        const browser = mkBrowser_();

        addPerformMultiAction(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'performMultiAction', sinon.match.func);
    });

    it('should call "multiTouchPerform" with action', async () => {
        const browser = mkBrowser_();

        addPerformMultiAction(browser);
        await browser.performMultiAction(['action-1', 'action-2']);

        assert.calledOnceWithExactly(browser.multiTouchPerform, ['action-1', 'action-2']);
    });
});
