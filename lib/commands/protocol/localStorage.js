'use strict';

const AVAILABLE_METHODS = ['GET', 'POST', 'DELETE'];

module.exports = (browser) => {
    browser.addCommand('localStorage', async function(method, args) {
        if (!AVAILABLE_METHODS.includes(method)) {
            throw new TypeError(`Invalid method "${method}" does not match on available methods: ${AVAILABLE_METHODS.join(', ')}`);
        }

        if (method === 'GET') {
            return args
                ? this.getLocalStorageItem(args)
                : this.getLocalStorage();
        }

        if (method === 'DELETE') {
            return args
                ? this.deleteLocalStorageItem(args)
                : this.clearLocalStorage();
        }

        const {key, value} = args;

        return this.setLocalStorage(key, value);
    });
};
