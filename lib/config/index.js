'use strict';

const _ = require('lodash');
const {root, section, option} = require('gemini-configparser');
const defaults = require('./defaults');

const thr = (str) => {
    throw new TypeError(str);
};

const ENV_PREFIX = 'hermione_wdio_migrator_';
const CLI_PREFIX = '--wdio-migrator-';

const assertType = (name, validationFn, type) => {
    return (v) => !validationFn(v) && thr(`"${name}" option must be ${type}, but got ${typeof v}`);
};

const assertBoolean = (name) => assertType(name, _.isBoolean, 'boolean');
const assertArrayOfStrings = (value, name) => {
    if (!(_.isArray(value) && value.every(_.isString))) {
        throw new Error(`"${name}" must be an array of strings but got ${JSON.stringify(value)}`);
    }
};

const getParser = () => {
    return root(section({
        enabled: option({
            defaultValue: defaults.enabled,
            parseEnv: JSON.parse,
            parseCli: JSON.parse,
            validate: assertBoolean('enabled')
        }),
        disableCommands: option({
            defaultValue: defaults.disableCommands,
            parseEnv: JSON.parse,
            parseCli: JSON.parse,
            validate: (value) => assertArrayOfStrings(value, 'disableCommands')
        })
    }), {envPrefix: ENV_PREFIX, cliPrefix: CLI_PREFIX});
};

module.exports = (options) => {
    const {env, argv} = process;

    return getParser()({options, env, argv});
};
