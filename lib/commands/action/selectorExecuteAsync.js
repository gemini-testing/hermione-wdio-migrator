'use strict';

module.exports = (browser) => {
    browser.addCommand('selectorExecuteAsync', async function(selectors, script, ...args) {
        const elems = await this.execute(function(selectors) {
            return selectors.map(function(selector) {
                return document.querySelector(selector);
            });
        }, [].concat(selectors));

        return this.executeAsync(script, ...elems, ...args);
    });
};
