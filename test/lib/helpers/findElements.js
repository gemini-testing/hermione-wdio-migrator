'use strict';

const findElements = require('lib/helpers/findElements');
const {mkBrowser_, mkElement_} = require('../../utils');

describe('"findElements" helper', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    afterEach(() => sinon.restore());

    it('should return found elements by passed selector', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();
        browser.$$.withArgs('.some-selector').resolves([element1, element2]);

        const foundElement = await findElements(browser, '.some-selector');

        assert.deepEqual(foundElement, [element1, element2]);
    });
});
