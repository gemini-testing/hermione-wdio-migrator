'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getTagName" command', () => {
    let browser, findElement, addGetTagName;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetTagName = proxyquire('lib/commands/property/getTagName', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getTagName" command', () => {
        addGetTagName(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getTagName', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetTagName(browser);

        await browser.getTagName('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getTagName" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetTagName(browser);

        await browser.getTagName('.some-selector');

        assert.calledOnceWithExactly(element.getTagName);
    });
});
