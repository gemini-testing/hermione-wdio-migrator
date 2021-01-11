'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"addValue" command', () => {
    let browser, findElements, addAddValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves([mkElement_()]);
        addAddValue = proxyquire('lib/commands/action/addValue', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "addValue" command', () => {
        addAddValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'addValue', sinon.match.func);
    });

    it('should get elements by passed selector', async () => {
        addAddValue(browser);

        await browser.addValue('.some-selector', 'text');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should call "addValue" on each browser element', async () => {
        const browser = mkBrowser_();
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addAddValue(browser);

        await browser.addValue('.some-selector', 'text');

        assert.calledWithExactly(element1.addValue, 'text');
        assert.calledWithExactly(element2.addValue, 'text');
    });
});
