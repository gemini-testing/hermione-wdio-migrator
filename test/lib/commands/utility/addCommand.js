'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"addCommand" command', () => {
    let browser, overwriteExistingCommand, overwriteAddCommand;

    beforeEach(() => {
        browser = mkBrowser_();
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteAddCommand = proxyquire('lib/commands/utility/addCommand', {
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite existing "addCommand" command', () => {
        overwriteAddCommand(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'addCommand', sinon.match.func);
    });

    describe('should call original "addCommand" if "overwrite" option is', () => {
        let origAddCommand, cb;

        beforeEach(() => {
            origAddCommand = browser.addCommand;
            cb = () => {};
        });

        it('not specified', () => {
            overwriteAddCommand(browser);

            browser.addCommand('someCommand', cb);

            assert.calledOnceWithExactly(origAddCommand, 'someCommand', cb);
            assert.notCalled(browser.overwriteCommand);
        });

        it('"false"', () => {
            overwriteAddCommand(browser);

            browser.addCommand('someCommand', cb, false);

            assert.calledOnceWithExactly(origAddCommand, 'someCommand', cb);
            assert.notCalled(browser.overwriteCommand);
        });
    });

    it('should overwrite passed command if "overwrite" option is "true"', () => {
        overwriteAddCommand(browser);

        browser.addCommand('someCommand', () => {}, true);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'someCommand', sinon.match.func);
    });

    it('should call overwritten command with correct args', () => {
        const cb = sinon.spy();
        overwriteAddCommand(browser);

        browser.addCommand('someCommand', cb, true);
        browser.someCommand('foo', 'bar');

        assert.calledOnceWithExactly(browser.someCommand, 'foo', 'bar');
    });

    it('should call callback of overwritten command with browser context', () => {
        const cb = sinon.spy();
        overwriteAddCommand(browser);

        browser.addCommand('someCommand', cb, true);
        browser.someCommand();

        assert.calledOn(cb, browser);
    });
});
