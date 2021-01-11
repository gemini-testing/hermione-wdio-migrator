'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"waitForVisible" command', () => {
    let browser, findElements, addWaitForVisible;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves(mkElement_());
        addWaitForVisible = proxyquire('lib/commands/utility/waitForVisible', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "waitForVisible" command', () => {
        addWaitForVisible(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'waitForVisible', sinon.match.func);
    });

    it('should get elements by passed selector', async () => {
        addWaitForVisible(browser);

        await browser.waitForVisible('.some-selector');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should call "waitUntil" with correct args', async () => {
        addWaitForVisible(browser);

        await browser.waitForVisible('.some-selector', 100, false);

        assert.calledOnceWithExactly(
            browser.waitUntil,
            sinon.match.func,
            {timeout: 100, timeoutMsg: 'element (".some-selector") still not visible after 100ms'}
        );
    });

    it('should check that each found element is displayed', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForVisible(browser);

        await browser.waitForVisible('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        await waitUntilHandler();

        assert.calledOnceWithExactly(element1.isDisplayed);
        assert.calledOnceWithExactly(element2.isDisplayed);
    });

    it('should return "true" if all found elements are displayed', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.isDisplayed.resolves(true);
        element2.isDisplayed.resolves(true);

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForVisible(browser);

        await browser.waitForVisible('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isTrue(result);
    });

    it('should return "false" if all found elements are displayed in reverse mode', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.isDisplayed.resolves(true);
        element2.isDisplayed.resolves(true);

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForVisible(browser);

        await browser.waitForVisible('.some-selector', 100, true);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isFalse(result);
    });
});
