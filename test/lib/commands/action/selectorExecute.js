'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"selectorExecute" command', () => {
    let browser, findElements, addSelectorExecute;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves(mkElement_());
        addSelectorExecute = proxyquire('lib/commands/action/selectorExecute', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "selectorExecute" command', () => {
        addSelectorExecute(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'selectorExecute', sinon.match.func);
    });

    it('should get all elements by passed selectors', async () => {
        addSelectorExecute(browser);

        await browser.selectorExecute(['.some-selector-1', '.some-selector-2']);

        assert.calledTwice(findElements);
        assert.calledWith(findElements.firstCall, browser, '.some-selector-1');
        assert.calledWith(findElements.secondCall, browser, '.some-selector-2');
    });

    it('should call "execute" on browser with passed script, found element and other passed args', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();
        const script = () => {};

        findElements.withArgs(browser, '.some-selector-1').resolves([element1]);
        findElements.withArgs(browser, '.some-selector-2').resolves([element2]);
        addSelectorExecute(browser);

        await browser.selectorExecute(['.some-selector-1', '.some-selector-2'], script, 'arg1', 'arg2');

        assert.calledOnceWithExactly(browser.execute, script, [element1], [element2], 'arg1', 'arg2');
    });
});
