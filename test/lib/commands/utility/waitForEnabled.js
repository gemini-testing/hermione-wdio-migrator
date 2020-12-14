'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"waitForEnabled" command', () => {
    let browser, findElements, addWaitForEnabled;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves([mkElement_()]);
        addWaitForEnabled = proxyquire('lib/commands/utility/waitForEnabled', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "waitForEnabled" command', () => {
        addWaitForEnabled(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'waitForEnabled', sinon.match.func);
    });

    it('should get elements by passed selector', async () => {
        addWaitForEnabled(browser);

        await browser.waitForEnabled('.some-selector');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should call "waitUntil" with correct args', async () => {
        addWaitForEnabled(browser);

        await browser.waitForEnabled('.some-selector', 100, false);

        assert.calledOnceWithExactly(
            browser.waitUntil,
            sinon.match.func,
            {timeout: 100, timeoutMsg: 'element (".some-selector") still not enabled after 100ms'}
        );
    });

    it('should check that each found element is enabled', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForEnabled(browser);

        await browser.waitForEnabled('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        await waitUntilHandler();

        assert.calledOnceWithExactly(element1.isEnabled);
        assert.calledOnceWithExactly(element2.isEnabled);
    });

    it('should return "true" if all found elements are enabled', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.isEnabled.resolves(true);
        element2.isEnabled.resolves(true);

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForEnabled(browser);

        await browser.waitForEnabled('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isTrue(result);
    });

    it('should return "false" if all found elements are enabled in reverse mode', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.isEnabled.resolves(true);
        element2.isEnabled.resolves(true);

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForEnabled(browser);

        await browser.waitForEnabled('.some-selector', 100, true);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isFalse(result);
    });
});
