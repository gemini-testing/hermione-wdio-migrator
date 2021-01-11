'use strict';

const AVAILABLE_METHODS = ['GET', 'POST', 'DELETE'];

module.exports = (browser) => {
    browser.addCommand('sessionStorage', async function(method, args) {
        if (!AVAILABLE_METHODS.includes(method)) {
            throw new TypeError(`Invalid method "${method}" does not match on available methods: ${AVAILABLE_METHODS.join(', ')}`);
        }

        if (method === 'GET') {
            return args
                ? this.getSessionStorageItem(args)
                : this.getSessionStorage();
        }

        if (method === 'DELETE') {
            return args
                ? this.deleteSessionStorageItem(args)
                : this.clearSessionStorage();
        }

        const {key, value} = args;

        return this.setSessionStorage(key, value);
    });
};
