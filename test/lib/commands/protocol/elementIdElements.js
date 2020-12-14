'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdElements" command', () => {
    let browser, findStrategy, addElementIdElements;

    beforeEach(() => {
        browser = mkBrowser_();
        findStrategy = sinon.stub().returns({});
        addElementIdElements = proxyquire('lib/commands/protocol/elementIdElements', {
            '../../helpers/findStrategy': findStrategy
        });
    });

    afterEach(() => sinon.restore());

    it('should add "elementIdElement" command', () => {
        addElementIdElements(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdElements', sinon.match.func);
    });

    it('should find selector strategy by passed selector', async () => {
        addElementIdElements(browser);

        await browser.elementIdElements('element-id', '.some-selector');

        assert.calledOnceWithExactly(findStrategy, '.some-selector');
    });

    it('should call "findElementsFromElement" with passed element id, selector strategy and selector', async () => {
        const browser = mkBrowser_();
        const using = 'css selector';
        const selector = '.some-selector';

        findStrategy.withArgs(selector).returns({using, value: selector});
        addElementIdElements(browser);

        await browser.elementIdElements('element-id', selector);

        assert.calledOnceWithExactly(browser.findElementsFromElement, 'element-id', using, selector);
    });
});
