'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"getViewportSize" command', () => {
    let browser, getViewportSizeScript, addGetViewportSize;

    beforeEach(() => {
        browser = mkBrowser_();
        getViewportSizeScript = sinon.stub();
        addGetViewportSize = proxyquire('lib/commands/window/getViewportSize', {
            '../../scripts/getViewportSize': getViewportSizeScript
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getViewportSize" command', () => {
        addGetViewportSize(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getViewportSize', sinon.match.func);
    });

    it('should execute script which return viewport size', async () => {
        addGetViewportSize(browser);
        browser.execute.withArgs(getViewportSizeScript).resolves({width: 100, height: 200});

        await browser.getViewportSize();

        assert.calledOnceWithExactly(browser.execute, getViewportSizeScript);
    });

    it('should return viewport size', async () => {
        addGetViewportSize(browser);
        browser.execute.withArgs(getViewportSizeScript).resolves({width: 100, height: 200});

        const result = await browser.getViewportSize();

        assert.deepEqual(result, {width: 100, height: 200});
    });

    describe('should return size of passed property', () => {
        it('width', async () => {
            addGetViewportSize(browser);
            browser.execute.withArgs(getViewportSizeScript).resolves({width: 100, height: 200});

            const result = await browser.getViewportSize('width');

            assert.deepEqual(result, 100);
        });

        it('height', async () => {
            addGetViewportSize(browser);
            browser.execute.withArgs(getViewportSizeScript).resolves({width: 100, height: 200});

            const result = await browser.getViewportSize('height');

            assert.deepEqual(result, 200);
        });
    });

    it('should return all props from viewport size is passed prop is not exists', async () => {
        addGetViewportSize(browser);
        browser.execute.withArgs(getViewportSizeScript).resolves({width: 100, height: 200});

        const result = await browser.getViewportSize('foo');

        assert.deepEqual(result, {width: 100, height: 200});
    });
});
