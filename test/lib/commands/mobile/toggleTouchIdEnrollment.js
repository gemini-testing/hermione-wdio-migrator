'use strict';

const addToggleTouchIdEnrollment = require('lib/commands/mobile/toggleTouchIdEnrollment');
const {mkBrowser_} = require('../../../utils');

describe('"toggleTouchIdEnrollment" command', () => {
    it('should add "toggleTouchIdEnrollment" command', () => {
        const browser = mkBrowser_();

        addToggleTouchIdEnrollment(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'toggleTouchIdEnrollment', sinon.match.func);
    });

    it('should call "getStrings" with language and string file', async () => {
        const browser = mkBrowser_();

        addToggleTouchIdEnrollment(browser);
        await browser.toggleTouchIdEnrollment(true);

        assert.calledOnceWithExactly(browser.toggleEnrollTouchId, true);
    });
});
