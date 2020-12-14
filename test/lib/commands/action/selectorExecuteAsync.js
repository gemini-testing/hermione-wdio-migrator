'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"selectorExecuteAsync" command', () => {
    let browser, findElements, addSelectorExecuteAsync;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves(mkElement_());
        addSelectorExecuteAsync = proxyquire('lib/commands/action/selectorExecuteAsync', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "selectorExecuteAsync" command', () => {
        addSelectorExecuteAsync(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'selectorExecuteAsync', sinon.match.func);
    });

    it('should get all elements by passed selectors', async () => {
        addSelectorExecuteAsync(browser);

        await browser.selectorExecuteAsync(['.some-selector-1', '.some-selector-2']);

        assert.calledTwice(findElements);
        assert.calledWith(findElements.firstCall, browser, '.some-selector-1');
        assert.calledWith(findElements.secondCall, browser, '.some-selector-2');
    });

    it('should call "executeAsync" on browser with passed script, found element and other passed args', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();
        const script = () => { };

        findElements.withArgs(browser, '.some-selector-1').resolves([element1]);
        findElements.withArgs(browser, '.some-selector-2').resolves([element2]);
        addSelectorExecuteAsync(browser);

        await browser.selectorExecuteAsync(['.some-selector-1', '.some-selector-2'], script, 'arg1', 'arg2');

        assert.calledOnceWithExactly(browser.executeAsync, script, [element1], [element2], 'arg1', 'arg2');
    });
});
