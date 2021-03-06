'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"leftClick" command', () => {
    let browser, findElement, addLeftClick;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addLeftClick = proxyquire('lib/commands/action/leftClick', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "leftClick" command', () => {
        addLeftClick(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'leftClick', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addLeftClick(browser);

        await browser.leftClick('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "click" on browser element with correct options', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addLeftClick(browser);

        await browser.leftClick('.some-selector', 100, 200);

        assert.calledOnceWithExactly(element.click, {button: 'left', x: 100, y: 200});
    });
});
