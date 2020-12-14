'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"selectByValue" command', () => {
    let browser, findElement, addSelectByValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addSelectByValue = proxyquire('lib/commands/action/selectByValue', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "selectByValue" command', () => {
        addSelectByValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'selectByValue', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addSelectByValue(browser);

        await browser.selectByValue('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "selectByAttribute" on browser element correct args', async () => {
        const element = mkElement_();
        const valueAttr = 'value';

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSelectByValue(browser);

        await browser.selectByValue('.some-selector', 'some-value');

        assert.calledOnceWithExactly(element.selectByAttribute, valueAttr, 'some-value');
    });
});
