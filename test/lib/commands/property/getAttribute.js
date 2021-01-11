'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getAttribute" command', () => {
    let browser, findElement, addGetAttribute;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetAttribute = proxyquire('lib/commands/property/getAttribute', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getAttribute" command', () => {
        addGetAttribute(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getAttribute', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetAttribute(browser);

        await browser.getAttribute('.some-selector', 'method');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getAttribute" on browser element with passed attribute name', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetAttribute(browser);

        await browser.getAttribute('.some-selector', 'method');

        assert.calledOnceWithExactly(element.getAttribute, 'method');
    });
});
