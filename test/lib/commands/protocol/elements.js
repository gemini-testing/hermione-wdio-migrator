'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"elements" command', () => {
    let browser, findElements, addElements;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves(mkElement_());
        addElements = proxyquire('lib/commands/protocol/elements', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "elements" command', () => {
        addElements(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elements', sinon.match.func);
    });

    it('should call "findElements" helper with browser and passed selector', async () => {
        addElements(browser);

        await browser.elements('.some-selector');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });
});
