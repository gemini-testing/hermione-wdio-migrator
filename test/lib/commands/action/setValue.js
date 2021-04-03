'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"setValue" command', () => {
    let browser, findElement, addSetValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addSetValue = proxyquire('lib/commands/action/setValue', {
            '../../helpers/findElement': findElement
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

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "setValue" on found browser element', async () => {
        const element = mkElement_();
        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSetValue(browser);

        await browser.setValue('.some-selector', 'text');

        assert.calledOnceWithExactly(element.setValue, 'text');
    });
});
