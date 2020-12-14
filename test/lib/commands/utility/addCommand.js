'use strict';

const overwriteAddCommand = require('lib/commands/utility/addCommand');
const {mkBrowser_} = require('../../../utils');

describe('"addCommand" command', () => {
    afterEach(() => sinon.restore());

    it('should overwrite "addCommand" command', () => {
        const browser = mkBrowser_();

        overwriteAddCommand(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'addCommand', sinon.match.func);
    });

    describe('should call original "addCommand" if "overwrite" option is', () => {
        let browser, origAddCommand, cb;

        beforeEach(() => {
            browser = mkBrowser_();
            origAddCommand = browser.addCommand;
            cb = () => {};
        });

        it('not specified', () => {
            overwriteAddCommand(browser);

            browser.addCommand('someCommand', cb);

            assert.calledOnceWithExactly(origAddCommand, 'someCommand', cb);
            assert.calledOnce(browser.overwriteCommand);
        });

        it('is "false"', () => {
            overwriteAddCommand(browser);

            browser.addCommand('someCommand', cb, false);

            assert.calledOnceWithExactly(origAddCommand, 'someCommand', cb);
            assert.calledOnce(browser.overwriteCommand);
        });
    });

    it('should overwrite passed command if "overwrite" option is "true"', () => {
        const browser = mkBrowser_();
        overwriteAddCommand(browser);

        browser.addCommand('someCommand', () => {}, true);

        assert.calledTwice(browser.overwriteCommand);
        assert.calledWith(browser.overwriteCommand.secondCall, 'someCommand', sinon.match.func);
    });

    it('should call overwritten command with correct args', () => {
        const browser = mkBrowser_();
        overwriteAddCommand(browser);

        browser.addCommand('someCommand', () => {}, true);
        browser.someCommand('foo', 'bar');

        assert.calledOnceWithExactly(browser.someCommand, 'foo', 'bar');
    });
});
