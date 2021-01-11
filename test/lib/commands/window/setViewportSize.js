'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"setViewportSize" command', () => {
    let browser, getViewportSizeScript, addSetViewportSize;

    beforeEach(() => {
        browser = mkBrowser_();
        getViewportSizeScript = sinon.stub();
        addSetViewportSize = proxyquire('lib/commands/window/setViewportSize', {
            '../../scripts/getViewportSize': getViewportSizeScript
        });
    });

    afterEach(() => sinon.restore());

    it('should add "setViewportSize" command', () => {
        addSetViewportSize(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'setViewportSize', sinon.match.func);
    });

    describe('should throw an error if', () => {
        it('"size" argument is not an object', async () => {
            addSetViewportSize(browser);

            await assert.isRejected(
                browser.setViewportSize('string'),
                'number or type of arguments don\'t agree with "setViewportSize" command'
            );
        });

        it('"size.width" argument is not a number', async () => {
            addSetViewportSize(browser);

            await assert.isRejected(
                browser.setViewportSize({width: '100', height: 200}),
                'number or type of arguments don\'t agree with "setViewportSize" command'
            );
        });

        it('"size.height" argument is not a number', async () => {
            addSetViewportSize(browser);

            await assert.isRejected(
                browser.setViewportSize({width: 100, height: '200'}),
                'number or type of arguments don\'t agree with "setViewportSize" command'
            );
        });

        it('"type" argument is not a boolean', async () => {
            addSetViewportSize(browser);

            await assert.isRejected(
                browser.setViewportSize({width: 100, height: 200}, 'string'),
                'number or type of arguments don\'t agree with "setViewportSize" command'
            );
        });
    });

    it('should call "setWindowSize" if "type" passed as "false"', async () => {
        addSetViewportSize(browser);

        await browser.setViewportSize({width: 100, height: 200}, false);

        assert.calledOnceWithExactly(browser.setWindowSize, 100, 200);
    });

    describe('"type" argument passed as "true" (change viewport size)', () => {
        it('should get current window size and viewport size', async () => {
            browser.getWindowSize.resolves({width: 200, height: 200});
            browser.execute.withArgs(getViewportSizeScript)
                .onFirstCall().returns({width: 100, height: 100})
                .onSecondCall().returns({width: 50, height: 50});

            addSetViewportSize(browser);

            await browser.setViewportSize({width: 50, height: 50}, true);

            assert.calledOnceWithExactly(browser.getWindowSize);
            assert.calledWithExactly(browser.execute.firstCall, getViewportSizeScript);
            assert.calledWithExactly(browser.execute.secondCall, getViewportSizeScript);
            assert.calledTwice(browser.execute);
        });

        it('should set new window size increased by diff beetween previous window size and viewport', async () => {
            browser.getWindowSize.resolves({width: 200, height: 300});
            browser.execute.withArgs(getViewportSizeScript)
                .onFirstCall().returns({width: 100, height: 200})
                .onSecondCall().returns({width: 50, height: 100});

            addSetViewportSize(browser);

            await browser.setViewportSize({width: 50, height: 100}, true);

            assert.calledOnceWithExactly(browser.setWindowSize, 50 + (200 - 100), 100 + (300 - 200));
        });

        it('should try to set viewport size again if it does not changed at first time', async () => {
            browser.getWindowSize.resolves({width: 200, height: 300});
            browser.execute.withArgs(getViewportSizeScript)
                .onFirstCall().returns({width: 100, height: 200})
                .onSecondCall().returns({width: 100, height: 200})
                .onCall(2).returns({width: 100, height: 200})
                .onCall(3).returns({width: 50, height: 100});

            addSetViewportSize(browser);

            await browser.setViewportSize({width: 50, height: 100}, true);

            assert.calledTwice(browser.setWindowSize);
            assert.calledWithExactly(browser.setWindowSize.firstCall, 50 + (200 - 100), 100 + (300 - 200));
            assert.calledWithExactly(browser.setWindowSize.secondCall, 50 + (200 - 100), 100 + (300 - 200));
        });
    });
});
