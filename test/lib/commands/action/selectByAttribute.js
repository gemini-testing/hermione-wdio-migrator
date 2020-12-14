'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"selectByAttribute" command', () => {
    let browser, findElement, addSelectByAttribute;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addSelectByAttribute = proxyquire('lib/commands/action/selectByAttribute', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "selectByAttribute" command', () => {
        addSelectByAttribute(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'selectByAttribute', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addSelectByAttribute(browser);

        await browser.selectByAttribute('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "selectByAttribute" on browser element', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSelectByAttribute(browser);

        await browser.selectByAttribute('.some-selector', 'attr', 'value');

        assert.calledOnceWithExactly(element.selectByAttribute, 'attr', 'value');
    });
});
