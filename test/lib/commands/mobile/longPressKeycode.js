'use strict';

const addLongPressKeycode = require('lib/commands/mobile/longPressKeycode');
const {mkBrowser_} = require('../../../utils');

describe('"longPressKeycode" command', () => {
    it('should add "longPressKeycode" command', () => {
        const browser = mkBrowser_();

        addLongPressKeycode(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'longPressKeycode', sinon.match.func);
    });

    it('should call "longPressKeyCode" with args parsed to numbers', async () => {
        const browser = mkBrowser_();

        addLongPressKeycode(browser);
        await browser.longPressKeycode('1', '2');

        assert.calledOnceWithExactly(browser.longPressKeyCode, 1, 2);
    });
});
