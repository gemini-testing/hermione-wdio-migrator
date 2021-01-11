'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getValue" command', () => {
    let browser, findElement, addGetValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetValue = proxyquire('lib/commands/property/getValue', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getValue" command', () => {
        addGetValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getValue', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetValue(browser);

        await browser.getValue('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getValue" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetValue(browser);

        await browser.getValue('.some-selector');

        assert.calledOnceWithExactly(element.getValue);
    });
});
