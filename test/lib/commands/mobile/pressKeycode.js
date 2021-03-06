'use strict';

const addPressKeycode = require('lib/commands/mobile/pressKeycode');
const {mkBrowser_} = require('../../../utils');

describe('"pressKeycode" command', () => {
    it('should add "pressKeycode" command', () => {
        const browser = mkBrowser_();

        addPressKeycode(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'pressKeycode', sinon.match.func);
    });

    it('should call "pressKeyCode" with args parsed to numbers', async () => {
        const browser = mkBrowser_();

        addPressKeycode(browser);
        await browser.pressKeycode('1', '2');

        assert.calledOnceWithExactly(browser.pressKeyCode, 1, 2);
    });
});
