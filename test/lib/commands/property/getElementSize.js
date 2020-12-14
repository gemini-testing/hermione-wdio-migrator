'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getElementSize" command', () => {
    let browser, findElement, addGetElementSize;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetElementSize = proxyquire('lib/commands/property/getElementSize', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite "getElementSize" command', () => {
        addGetElementSize(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'getElementSize', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetElementSize(browser);

        await browser.getElementSize('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call original "getElementSize" with found element id', async () => {
        const element = mkElement_({id: 123});
        const origGetElementSize = browser.getElementSize;

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetElementSize(browser);

        await browser.getElementSize('.some-selector');

        assert.calledOnceWithExactly(origGetElementSize, 123);
    });

    it('should return all info about element size if "prop" parameter is not passed', async () => {
        const element = mkElement_({id: 123});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        browser.getElementSize.withArgs(123).returns({width: 100, height: 200});
        addGetElementSize(browser);

        const result = await browser.getElementSize('.some-selector');

        assert.deepEqual(result, {width: 100, height: 200});
    });

    it('should return only one property of size if "prop" parameter is passed', async () => {
        const element = mkElement_({id: 123});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        browser.getElementSize.withArgs(123).returns({width: 100, height: 200});
        addGetElementSize(browser);

        const result = await browser.getElementSize('.some-selector', 'width');

        assert.equal(result, 100);
    });
});
