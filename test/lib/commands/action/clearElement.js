'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"clearElement" command', () => {
    let browser, findElements, addClearElement;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves([mkElement_()]);
        addClearElement = proxyquire('lib/commands/action/clearElement', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "clearElement" command', () => {
        addClearElement(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'clearElement', sinon.match.func);
    });

    it('should get elements by passed selector', async () => {
        addClearElement(browser);

        await browser.clearElement('.some-selector');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should call "clearValue" on each browser element', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addClearElement(browser);

        await browser.clearElement('.some-selector');

        assert.calledOnceWithExactly(element1.clearValue);
        assert.calledOnceWithExactly(element2.clearValue);
    });
});
