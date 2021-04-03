'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"addValue" command', () => {
    let browser, findElement, addAddValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addAddValue = proxyquire('lib/commands/action/addValue', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "addValue" command', () => {
        addAddValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'addValue', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addAddValue(browser);

        await browser.addValue('.some-selector', 'text');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "addValue" on found browser element', async () => {
        const element = mkElement_();
        findElement.withArgs(browser, '.some-selector').resolves(element);
        addAddValue(browser);

        await browser.addValue('.some-selector', 'text');

        assert.calledOnceWithExactly(element.addValue, 'text');
    });
});
