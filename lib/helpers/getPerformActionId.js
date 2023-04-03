'use strict';

module.exports = (browser, prefix = 'hermione_pointer') => {
    const id = browser.executionContext && browser.executionContext.ctx && browser.executionContext.ctx.currentTest
        ? browser.executionContext.ctx.currentTest.id.toString()
        : '';

    return id ? `${prefix}_${id}` : prefix;
};
