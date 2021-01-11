'use strict';

const parseConfig = require('lib/config');

describe('config', () => {
    describe('"enabled" option', () => {
        it('should be enabled by default', () => {
            assert.isTrue(parseConfig({}).enabled);
        });

        it('should set option', () => {
            const config = parseConfig({enabled: false});

            assert.isFalse(config.enabled);
        });

        it('should throw error if option is not boolean', () => {
            assert.throws(
                () => parseConfig({enabled: 'foo'}),
                Error,
                '"enabled" option must be boolean, but got string'
            );
        });
    });

    describe('"disableCommands" option', () => {
        it('should be empty array by default', () => {
            assert.deepEqual(parseConfig({}).disableCommands, []);
        });

        it('should set "disableCommands" option', () => {
            const config = parseConfig({disableCommands: ['foo']});

            assert.deepEqual(config.disableCommands, ['foo']);
        });

        it('should throw error if option is not an array of strings', () => {
            assert.throws(
                () => parseConfig({disableCommands: [123]}),
                Error,
                '"disableCommands" must be an array of strings but got [123]'
            );
        });
    });
});
