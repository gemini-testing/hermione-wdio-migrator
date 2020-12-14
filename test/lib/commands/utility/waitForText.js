'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"waitForText" command', () => {
    let browser, findElements, addWaitForText;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves(mkElement_());
        addWaitForText = proxyquire('lib/commands/utility/waitForText', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "waitForText" command', () => {
        addWaitForText(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'waitForText', sinon.match.func);
    });

    it('should get elements by passed selector', async () => {
        addWaitForText(browser);

        await browser.waitForText('.some-selector');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should call "waitUntil" with correct args', async () => {
        addWaitForText(browser);

        await browser.waitForText('.some-selector', 100, false);

        assert.calledOnceWithExactly(
            browser.waitUntil,
            sinon.match.func,
            {timeout: 100, timeoutMsg: 'element (".some-selector") still without text after 100ms'}
        );
    });

    it('should check that each found element has text', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForText(browser);

        await browser.waitForText('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        await waitUntilHandler();

        assert.calledOnceWithExactly(element1.getText);
        assert.calledOnceWithExactly(element2.getText);
    });

    it('should return "true" if all found elements has text', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.getText.resolves('text1');
        element2.getText.resolves('text2');

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForText(browser);

        await browser.waitForText('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isTrue(result);
    });

    it('should return "false" if all found elements has not text in reverse mode', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.getText.resolves('');
        element2.getText.resolves('');

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForText(browser);

        await browser.waitForText('.some-selector', 100, true);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isFalse(result);
    });
});
