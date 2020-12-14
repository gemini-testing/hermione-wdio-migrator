'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"rightClick" command', () => {
    let browser, findElement, addRightClick;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addRightClick = proxyquire('lib/commands/action/rightClick', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "rightClick" command', () => {
        addRightClick(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'rightClick', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addRightClick(browser);

        await browser.rightClick('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "click" on browser element with correct options', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addRightClick(browser);

        await browser.rightClick('.some-selector', 100, 200);

        assert.calledOnceWithExactly(element.click, {button: 'right', x: 100, y: 200});
    });
});
