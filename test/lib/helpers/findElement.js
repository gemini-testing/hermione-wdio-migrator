'use strict';

const findElement = require('lib/helpers/findElement');
const {mkBrowser_, mkElement_} = require('../../utils');

describe('"findElement" helper', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    afterEach(() => sinon.restore());

    it('should return found element by passed selector', async () => {
        const element = mkElement_();
        browser.$.withArgs('.some-selector').resolves(element);

        const foundElement = await findElement(browser, '.some-selector');

        assert.deepEqual(foundElement, element);
    });
});
