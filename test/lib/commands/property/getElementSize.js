'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getElementSize" command', () => {
    let browser, findElement, overwriteExistingCommand, overwriteGetElementSize;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        overwriteExistingCommand = sinon.stub().callsFake((_, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteGetElementSize = proxyquire('lib/commands/property/getElementSize', {
            '../../helpers/findElement': findElement,
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    describe('browser does not support w3c protocol', () => {
        beforeEach(() => {
            browser.isW3C = false;
        });

        it('should not add existing "getElementSize" command', () => {
            overwriteGetElementSize(browser);

            assert.notCalled(browser.addCommand);
        });

        it('should overwrite existing "getElementSize" command', () => {
            overwriteGetElementSize(browser);

            assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'getElementSize', sinon.match.func);
        });

        it('should get element by passed selector', async () => {
            overwriteGetElementSize(browser);

            await browser.getElementSize('.some-selector');

            assert.calledOnceWithExactly(findElement, browser, '.some-selector');
        });

        it('should call original "getElementSize" with found element id', async () => {
            const element = mkElement_({id: 123});
            const origGetElementSize = browser.getElementSize;

            findElement.withArgs(browser, '.some-selector').resolves(element);
            overwriteGetElementSize(browser);

            await browser.getElementSize('.some-selector');

            assert.calledOnceWithExactly(origGetElementSize, 123);
        });

        it('should return all info about element size if "prop" parameter is not passed', async () => {
            const element = mkElement_({id: 123});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            browser.getElementSize.withArgs(123).returns({width: 100, height: 200});
            overwriteGetElementSize(browser);

            const result = await browser.getElementSize('.some-selector');

            assert.deepEqual(result, {width: 100, height: 200});
        });

        it('should return only one property of size if "prop" parameter is passed', async () => {
            const element = mkElement_({id: 123});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            browser.getElementSize.withArgs(123).returns({width: 100, height: 200});
            overwriteGetElementSize(browser);

            const result = await browser.getElementSize('.some-selector', 'width');

            assert.equal(result, 100);
        });
    });

    describe('browser support w3c protocol', () => {
        beforeEach(() => {
            browser.isW3C = true;
        });

        it('should not overwrite not existing "getElementSize" command', () => {
            overwriteGetElementSize(browser);

            assert.notCalled(overwriteExistingCommand);
        });

        it('should add not existing "getElementSize" command', () => {
            overwriteGetElementSize(browser);

            assert.calledOnceWithExactly(browser.addCommand, 'getElementSize', sinon.match.func);
        });

        it('should get element by passed selector', async () => {
            overwriteGetElementSize(browser);

            await browser.getElementSize('.some-selector');

            assert.calledOnceWithExactly(findElement, browser, '.some-selector');
        });

        it('should return all info about element size if "prop" parameter is not passed', async () => {
            const element = mkElement_();
            element.getSize.withArgs(undefined).returns({width: 100, height: 200});

            findElement.withArgs(browser, '.some-selector').resolves(element);
            overwriteGetElementSize(browser);

            const result = await browser.getElementSize('.some-selector');

            assert.deepEqual(result, {width: 100, height: 200});
        });

        it('should return only one property of size if "prop" parameter is passed', async () => {
            const element = mkElement_();
            element.getSize.withArgs('width').returns(100);

            findElement.withArgs(browser, '.some-selector').resolves(element);
            overwriteGetElementSize(browser);

            const result = await browser.getElementSize('.some-selector', 'width');

            assert.equal(result, 100);
        });
    });
});
