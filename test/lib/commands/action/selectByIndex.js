'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"selectByIndex" command', () => {
    let browser, findElement, addSelectByIndex;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addSelectByIndex = proxyquire('lib/commands/action/selectByIndex', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "selectByIndex" command', () => {
        addSelectByIndex(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'selectByIndex', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addSelectByIndex(browser);

        await browser.selectByIndex('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "selectByIndex" on browser element', async () => {
        const element = mkElement_();
        const index = 1;

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSelectByIndex(browser);

        await browser.selectByIndex('.some-selector', index);

        assert.calledOnceWithExactly(element.selectByIndex, index);
    });
});
