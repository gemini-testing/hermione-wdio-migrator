'use strict';

const addPerformTouchAction = require('lib/commands/mobile/performTouchAction');
const {mkBrowser_} = require('../../../utils');

describe('"performTouchAction" command', () => {
    it('should add "performTouchAction" command', () => {
        const browser = mkBrowser_();

        addPerformTouchAction(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'performTouchAction', sinon.match.func);
    });

    it('should call "touchPerform" with action', async () => {
        const browser = mkBrowser_();

        addPerformTouchAction(browser);
        await browser.performTouchAction(['action-1', 'action-2']);

        assert.calledOnceWithExactly(browser.touchPerform, ['action-1', 'action-2']);
    });
});
