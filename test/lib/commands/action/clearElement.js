'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"clearElement" command', () => {
    let browser, findElement, addClearElement;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addClearElement = proxyquire('lib/commands/action/clearElement', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "clearElement" command', () => {
        addClearElement(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'clearElement', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addClearElement(browser);

        await browser.clearElement('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "clearValue" on found browser element', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addClearElement(browser);

        await browser.clearElement('.some-selector');

        assert.calledOnceWithExactly(element.clearValue);
    });
});
