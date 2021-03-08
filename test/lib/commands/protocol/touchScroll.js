'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"touchScroll" command', () => {
    let browser, overwriteExistingCommand, overwriteTouchScroll;

    beforeEach(() => {
        browser = mkBrowser_();
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteTouchScroll = proxyquire('lib/commands/protocol/touchScroll', {
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite existing "touchScroll" command', () => {
        overwriteTouchScroll(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'touchScroll', sinon.match.func);
    });

    describe('should call original "touchScroll" with args', () => {
        let origTouchScroll;

        beforeEach(() => {
            origTouchScroll = browser.touchScroll;
        });

        it('passed in old sequence', async () => {
            overwriteTouchScroll(browser);

            await browser.touchScroll('element-id', 100, 200);

            assert.calledOnceWithExactly(origTouchScroll, 100, 200, 'element-id');
        });

        it('passed in new sequence', async () => {
            overwriteTouchScroll(browser);

            await browser.touchScroll(100, 200, 'element-id');

            assert.calledOnceWithExactly(origTouchScroll, 100, 200, 'element-id');
        });
    });
});
