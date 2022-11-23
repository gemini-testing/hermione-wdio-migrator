'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"waitForExist" command', () => {
    let browser, findElements, addWaitForExist;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves(mkElement_());
        addWaitForExist = proxyquire('lib/commands/utility/waitForExist', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "waitForExist" command', () => {
        addWaitForExist(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'waitForExist', sinon.match.func);
    });

    it('should call "waitUntil" with correct args', async () => {
        addWaitForExist(browser);

        await browser.waitForExist('.some-selector', 100, false);

        assert.calledOnceWithExactly(
            browser.waitUntil,
            sinon.match.func,
            {timeout: 100, timeoutMsg: 'element (".some-selector") still not existing after 100ms'}
        );
    });

    it('should get default timeout from browser options', async () => {
        addWaitForExist(browser);

        await browser.waitForExist('.some-selector');

        assert.calledOnceWithMatch(
            browser.waitUntil,
            sinon.match.func,
            {timeout: browser.options.waitforTimeout}
        );
    });

    it('should get elements by passed selector', async () => {
        findElements.withArgs(browser, '.some-selector').resolves([]);
        addWaitForExist(browser);

        await browser.waitForExist('.some-selector');
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        await waitUntilHandler();

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should return "true" if elements are not found in reverse mode', async () => {
        findElements.withArgs(browser, '.some-selector').resolves([]);
        addWaitForExist(browser);

        await browser.waitForExist('.some-selector', 100, true);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isTrue(result);
    });

    it('should return "false" if elements are not found in normal mode', async () => {
        findElements.withArgs(browser, '.some-selector').resolves([]);
        addWaitForExist(browser);

        await browser.waitForExist('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isFalse(result);
    });

    it('should check that each found element is existed', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForExist(browser);

        await browser.waitForExist('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        await waitUntilHandler();

        assert.calledOnceWithExactly(element1.isExisting);
        assert.calledOnceWithExactly(element2.isExisting);
    });

    it('should return "true" if all found elements are existed', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.isExisting.resolves(true);
        element2.isExisting.resolves(true);

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForExist(browser);

        await browser.waitForExist('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isTrue(result);
    });

    it('should return "false" if all found elements are existed in reverse mode', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.isExisting.resolves(true);
        element2.isExisting.resolves(true);

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForExist(browser);

        await browser.waitForExist('.some-selector', 100, true);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isFalse(result);
    });
});
