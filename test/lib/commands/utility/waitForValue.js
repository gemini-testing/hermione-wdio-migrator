'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"waitForValue" command', () => {
    let browser, findElements, addWaitForValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves(mkElement_());
        addWaitForValue = proxyquire('lib/commands/utility/waitForValue', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "waitForValue" command', () => {
        addWaitForValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'waitForValue', sinon.match.func);
    });

    it('should get elements by passed selector', async () => {
        addWaitForValue(browser);

        await browser.waitForValue('.some-selector');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should call "waitUntil" with correct args', async () => {
        addWaitForValue(browser);

        await browser.waitForValue('.some-selector', 100, false);

        assert.calledOnceWithExactly(
            browser.waitUntil,
            sinon.match.func,
            {timeout: 100, timeoutMsg: 'element (".some-selector") still without a value after 100ms'}
        );
    });

    it('should check that each found element has value', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForValue(browser);

        await browser.waitForValue('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        await waitUntilHandler();

        assert.calledOnceWithExactly(element1.getValue);
        assert.calledOnceWithExactly(element2.getValue);
    });

    it('should return "true" if all found elements has value', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.getValue.resolves('value1');
        element2.getValue.resolves('value2');

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForValue(browser);

        await browser.waitForValue('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isTrue(result);
    });

    it('should return "false" if all found elements has not value in reverse mode', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.getValue.resolves('');
        element2.getValue.resolves('');

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForValue(browser);

        await browser.waitForValue('.some-selector', 100, true);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isFalse(result);
    });
});
