'use strict';

const parseConfig = require('./config');
const browserCommands = require('./commands');

module.exports = (hermione, opts) => {
    const pluginConfig = parseConfig(opts);

    if (!pluginConfig.enabled || !hermione.isWorker()) {
        return;
    }

    hermione.on(hermione.events.NEW_BROWSER, (browser) => {
        Object.keys(browserCommands).forEach((commandName) => {
            if (!pluginConfig.disableCommands.includes(commandName)) {
                browserCommands[commandName](browser);
            }
        });
    });
};
