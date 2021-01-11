'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"setValue" command', () => {
    let browser, findElements, addSetValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElements = sinon.stub().resolves([mkElement_()]);
        addSetValue = proxyquire('lib/commands/action/setValue', {
            '../../helpers/findElements': findElements
        });
    });

    afterEach(() => sinon.restore());

    it('should add "setValue" command', () => {
        addSetValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'setValue', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addSetValue(browser);

        await browser.setValue('.some-selector');

        assert.calledOnceWithExactly(findElements, browser, '.some-selector');
    });

    it('should call "setValue" on each browser element', async () => {
        const element1 = mkElement_();
        const element2 = mkElement_();

        findElements.withArgs(browser, '.some-selector').resolves([element1, element2]);
        addSetValue(browser);

        await browser.setValue('.some-selector', 'text');

        assert.calledOnceWithExactly(element1.setValue, 'text');
        assert.calledOnceWithExactly(element2.setValue, 'text');
    });
});
