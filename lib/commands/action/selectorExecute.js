'use strict';

module.exports = (browser) => {
    browser.addCommand('selectorExecute', async function(selectors, script, ...args) {
        const elems = await this.execute(function(selectors) {
            return selectors.map(function(selector) {
                return document.querySelector(selector);
            });
        }, [].concat(selectors));

        return this.execute(script, ...elems, ...args);
    });
};
