'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"click" command', () => {
    let browser, findElement, addClick;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addClick = proxyquire('lib/commands/action/click', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "click" command', () => {
        addClick(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'click', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addClick(browser);

        await browser.click('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "click" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addClick(browser);

        await browser.click('.some-selector');

        assert.calledOnceWithExactly(element.click);
    });
});
