'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"waitForSelected" command', () => {
    let browser, findElements, addWaitForSelected;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves(mkElement_());
        addWaitForSelected = proxyquire('lib/commands/utility/waitForSelected', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "waitForSelected" command', () => {
        addWaitForSelected(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'waitForSelected', sinon.match.func);
    });

    it('should get elements by passed selector', async () => {
        addWaitForSelected(browser);

        await browser.waitForSelected('.some-selector');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should call "waitUntil" with correct args', async () => {
        addWaitForSelected(browser);

        await browser.waitForSelected('.some-selector', 100, false);

        assert.calledOnceWithExactly(
            browser.waitUntil,
            sinon.match.func,
            {timeout: 100, timeoutMsg: 'element (".some-selector") still not selected after 100ms'}
        );
    });

    it('should check that each found element is selected', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForSelected(browser);

        await browser.waitForSelected('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        await waitUntilHandler();

        assert.calledOnceWithExactly(element1.isSelected);
        assert.calledOnceWithExactly(element2.isSelected);
    });

    it('should return "true" if all found elements are selected', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.isSelected.resolves(true);
        element2.isSelected.resolves(true);

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForSelected(browser);

        await browser.waitForSelected('.some-selector', 100, false);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isTrue(result);
    });

    it('should return "false" if all found elements are selected in reverse mode', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        element1.isSelected.resolves(true);
        element2.isSelected.resolves(true);

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addWaitForSelected(browser);

        await browser.waitForSelected('.some-selector', 100, true);
        const waitUntilHandler = browser.waitUntil.firstCall.args[0];
        const result = await waitUntilHandler();

        assert.isFalse(result);
    });
});
