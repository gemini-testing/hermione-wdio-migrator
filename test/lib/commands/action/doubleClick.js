'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"doubleClick" command', () => {
    let browser, findElement, addDoubleClick;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addDoubleClick = proxyquire('lib/commands/action/doubleClick', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "doubleClick" command', () => {
        addDoubleClick(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'doubleClick', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addDoubleClick(browser);
        await browser.doubleClick('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "doubleClick" on browser element', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addDoubleClick(browser);

        await browser.doubleClick('.some-selector');

        assert.calledOnceWithExactly(element.doubleClick);
    });
});
