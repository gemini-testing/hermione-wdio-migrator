'use strict';

const {EventEmitter} = require('events');
const _ = require('lodash');
const plugin = require('lib');
const commands = require('lib/commands');
const {mkBrowser_} = require('../utils');

describe('plugin', () => {
    const mkHermione_ = (opts = {}) => {
        opts = _.defaults(opts, {proc: 'master'});

        const hermione = new EventEmitter();

        hermione.events = {NEW_BROWSER: 'newBrowser'};
        hermione.isWorker = sinon.stub().returns(opts.proc === 'worker');

        return hermione;
    };

    beforeEach(() => {
        Object.keys(commands).forEach((command) => {
            commands[command] = sinon.stub();
        });
    });

    afterEach(() => sinon.restore());

    it('should do nothing if plugin is disabled', () => {
        const hermione = mkHermione_();
        sinon.spy(hermione, 'prependListener');

        plugin(hermione);

        assert.notCalled(hermione.prependListener);
    });

    describe('master process', () => {
        it('should do nothing', () => {
            const hermione = mkHermione_({proc: 'master'});
            sinon.spy(hermione, 'prependListener');

            plugin(hermione);

            assert.notCalled(hermione.prependListener);
        });
    });

    describe('worker process', () => {
        describe('"NEW_BROWSER" event', () => {
            it('should disable browser command specified in config', () => {
                const browser = mkBrowser_();
                const hermione = mkHermione_({proc: 'worker'});

                plugin(hermione, {disableCommands: ['addValue']});

                hermione.emit(hermione.events.NEW_BROWSER, browser);

                assert.notCalled(commands.addValue);
            });

            it('should call browser command', () => {
                const browser = mkBrowser_();
                const hermione = mkHermione_({proc: 'worker'});

                plugin(hermione);

                hermione.emit(hermione.events.NEW_BROWSER, browser, {browserId: 'b1'});

                assert.calledOnceWithExactly(commands.addValue, browser);
            });
        });
    });
});
