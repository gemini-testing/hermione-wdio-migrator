'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"moveToObject" command', () => {
    let browser, findElement, addMoveToObject;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addMoveToObject = proxyquire('lib/commands/action/moveToObject', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "moveToObject" command', () => {
        addMoveToObject(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'moveToObject', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addMoveToObject(browser);

        await browser.moveToObject('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "moveTo" on browser element with passed offset', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addMoveToObject(browser);

        await browser.moveToObject('.some-selector', 100, 200);

        assert.calledOnceWithExactly(element.moveTo, {xOffset: 100, yOffset: 200});
    });
});
