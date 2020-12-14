'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdElement" command', () => {
    let browser, findStrategy, addElementIdElement;

    beforeEach(() => {
        browser = mkBrowser_();
        findStrategy = sinon.stub().returns({});
        addElementIdElement = proxyquire('lib/commands/protocol/elementIdElement', {
            '../../helpers/findStrategy': findStrategy
        });
    });

    afterEach(() => sinon.restore());

    it('should add "elementIdElement" command', () => {
        addElementIdElement(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdElement', sinon.match.func);
    });

    it('should find selector strategy by passed selector', async () => {
        addElementIdElement(browser);

        await browser.elementIdElement('element-id', '.some-selector');

        assert.calledOnceWithExactly(findStrategy, '.some-selector');
    });

    it('should call "findElementFromElement" with passed element id, selector strategy and selector', async () => {
        const browser = mkBrowser_();
        const using = 'css selector';
        const selector = '.some-selector';

        findStrategy.withArgs(selector).returns({using, value: selector});
        addElementIdElement(browser);

        await browser.elementIdElement('element-id', selector);

        assert.calledOnceWithExactly(browser.findElementFromElement, 'element-id', using, selector);
    });
});
