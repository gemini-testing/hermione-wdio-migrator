'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"selectByVisibleText" command', () => {
    let browser, findElement, addSelectByVisibleText;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addSelectByVisibleText = proxyquire('lib/commands/action/selectByVisibleText', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "selectByVisibleText" command', () => {
        addSelectByVisibleText(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'selectByVisibleText', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addSelectByVisibleText(browser);

        await browser.selectByVisibleText('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "selectByVisibleText" on browser element correct args', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSelectByVisibleText(browser);

        await browser.selectByVisibleText('.some-selector', 'some-text');

        assert.calledOnceWithExactly(element.selectByVisibleText, 'some-text');
    });
});
