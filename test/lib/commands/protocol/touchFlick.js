'use strict';

const addTouchFlick = require('lib/commands/protocol/touchFlick');
const {mkBrowser_} = require('../../../utils');

describe('"touchFlick" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    it('should overwrite "touchFlick" command', () => {
        addTouchFlick(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'touchFlick', sinon.match.func);
    });

    describe('should call original "touchFlick" with args', () => {
        let origTouchFlick;

        beforeEach(() => {
            origTouchFlick = browser.touchFlick;
        });

        it('passed in old sequence', async () => {
            addTouchFlick(browser);

            await browser.touchFlick('element-id', 100, 200, 300, 400, 500);

            assert.calledOnceWithExactly(origTouchFlick, 100, 200, 'element-id', 300, 400, 500);
        });

        it('passed in new sequence', async () => {
            addTouchFlick(browser);

            await browser.touchFlick(100, 200, 'element-id', 300, 400, 500);

            assert.calledOnceWithExactly(origTouchFlick, 100, 200, 'element-id', 300, 400, 500);
        });
    });
});
