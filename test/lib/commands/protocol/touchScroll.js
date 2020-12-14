'use strict';

const addTouchScroll = require('lib/commands/protocol/touchScroll');
const {mkBrowser_} = require('../../../utils');

describe('"touchScroll" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    it('should overwrite "touchScroll" command', () => {
        addTouchScroll(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'touchScroll', sinon.match.func);
    });

    describe('should call original "touchScroll" with args', () => {
        let origTouchScroll;

        beforeEach(() => {
            origTouchScroll = browser.touchScroll;
        });

        it('passed in old sequence', async () => {
            addTouchScroll(browser);

            await browser.touchScroll('element-id', 100, 200);

            assert.calledOnceWithExactly(origTouchScroll, 100, 200, 'element-id');
        });

        it('passed in new sequence', async () => {
            addTouchScroll(browser);

            await browser.touchScroll(100, 200, 'element-id');

            assert.calledOnceWithExactly(origTouchScroll, 100, 200, 'element-id');
        });
    });
});
