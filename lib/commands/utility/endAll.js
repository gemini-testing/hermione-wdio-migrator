'use strict';

const Promise = require('bluebird');

module.exports = (browser) => {
    browser.addCommand('endAll', async function() {
        const sessions = await this.getSessions();

        return Promise.map(sessions, (session) => this.deleteSession(session.id));
    });
};
