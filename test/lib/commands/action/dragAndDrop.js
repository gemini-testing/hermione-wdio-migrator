'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"dragAndDrop" command', () => {
    let browser, findElement, addDragAndDrop;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addDragAndDrop = proxyquire('lib/commands/action/dragAndDrop', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "dragAndDrop" command', () => {
        addDragAndDrop(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'dragAndDrop', sinon.match.func);
    });

    it('should get elements by passed selectors', async () => {
        addDragAndDrop(browser);

        await browser.dragAndDrop('.src-selector', '.dest-selector');

        assert.calledTwice(findElement);
        assert.calledWithExactly(findElement.firstCall, browser, '.src-selector');
        assert.calledWithExactly(findElement.secondCall, browser, '.dest-selector');
    });

    it('should get element only for first selector if destination passed as coordinate', async () => {
        const browser = mkBrowser_();

        addDragAndDrop(browser);
        await browser.dragAndDrop('.src-selector', {x: 100, y: 200});

        assert.calledOnceWithExactly(findElement, browser, '.src-selector');
    });

    it('should call "dragAndDrop" on source browser element with destination element', async () => {
        const browser = mkBrowser_();
        const srcElement = mkElement_();
        const destElement = mkElement_();

        findElement.withArgs(browser, '.src-selector').resolves(srcElement);
        findElement.withArgs(browser, '.dest-selector').resolves(destElement);
        addDragAndDrop(browser);

        await browser.dragAndDrop('.src-selector', '.dest-selector');

        assert.calledOnceWithExactly(srcElement.dragAndDrop, destElement);
    });

    it('should call "dragAndDrop" on source browser element with destination coordinate', async () => {
        const browser = mkBrowser_();
        const srcElement = mkElement_();
        const coordinate = {x: 100, y: 200};

        findElement.withArgs(browser, '.src-selector').resolves(srcElement);

        addDragAndDrop(browser);
        await browser.dragAndDrop('.src-selector', coordinate);

        assert.calledOnceWithExactly(srcElement.dragAndDrop, coordinate);
    });
});
