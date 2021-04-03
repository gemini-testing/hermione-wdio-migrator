'use strict';

module.exports = (browser) => {
    browser.addCommand('selectorExecute', async function(selectors, script, ...args) {
        const elems = await this.execute((selectors) => {
            return selectors.map((selector) => document.querySelector(selector));
        }, [].concat(selectors));

        return this.execute(script, ...elems, ...args);
    });
};
