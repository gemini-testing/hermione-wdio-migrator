'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getHTML" command', () => {
    let browser, findElement, addGetHTML;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetHTML = proxyquire('lib/commands/property/getHTML', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getHTML" command', () => {
        addGetHTML(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getHTML', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetHTML(browser);

        await browser.getHTML('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getHTML" on browser element with passed selector', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetHTML(browser);

        await browser.getHTML('.some-selector');

        assert.calledOnceWithExactly(element.getHTML);
    });
});
