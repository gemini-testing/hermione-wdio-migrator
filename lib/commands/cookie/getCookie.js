'use strict';

module.exports = (browser) => {
    browser.addCommand('getCookie', async function(names) {
        const cookies = await this.getCookies(names);

        return cookies.length === 1 ? cookies[0] : cookies;
    });
};
