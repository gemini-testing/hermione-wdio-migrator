'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"touchFlick" command', () => {
    let browser, overwriteExistingCommand, overwriteTouchFlick;

    beforeEach(() => {
        browser = mkBrowser_();
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteTouchFlick = proxyquire('lib/commands/protocol/touchFlick', {
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite existing "touchFlick" command', () => {
        overwriteTouchFlick(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'touchFlick', sinon.match.func);
    });

    describe('should call original "touchFlick" with args', () => {
        let origTouchFlick;

        beforeEach(() => {
            origTouchFlick = browser.touchFlick;
        });

        it('passed in old sequence', async () => {
            overwriteTouchFlick(browser);

            await browser.touchFlick('element-id', 100, 200, 300, 400, 500);

            assert.calledOnceWithExactly(origTouchFlick, 100, 200, 'element-id', 300, 400, 500);
        });

        it('passed in new sequence', async () => {
            overwriteTouchFlick(browser);

            await browser.touchFlick(100, 200, 'element-id', 300, 400, 500);

            assert.calledOnceWithExactly(origTouchFlick, 100, 200, 'element-id', 300, 400, 500);
        });
    });
});
