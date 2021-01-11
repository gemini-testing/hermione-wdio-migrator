'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"middleClick" command', () => {
    let browser, findElement, addMiddleClick;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addMiddleClick = proxyquire('lib/commands/action/middleClick', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "middleClick" command', () => {
        addMiddleClick(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'middleClick', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addMiddleClick(browser);

        await browser.middleClick('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "click" on browser element with correct options', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addMiddleClick(browser);

        await browser.middleClick('.some-selector', 100, 200);

        assert.calledOnceWithExactly(element.click, {button: 'middle', x: 100, y: 200});
    });
});
