'use strict';

const AVAILABLE_OPERATIONS = ['get', 'delete'];

module.exports = (browser) => {
    browser.addCommand('session', async function(operation = 'get', sessionId) {
        if (!AVAILABLE_OPERATIONS.includes(operation)) {
            throw new TypeError(`Invalid operation "${operation}" does not match on available operations: ${AVAILABLE_OPERATIONS.join(', ')}`);
        }

        if (operation === 'get') {
            return sessionId
                ? this.getSession(sessionId)
                : this.getSessions();
        }

        return this.deleteSession(sessionId);
    });
};
