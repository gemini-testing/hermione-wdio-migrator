'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"touchAction" command', () => {
    let browser, findElement, addTouchAction;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addTouchAction = proxyquire('lib/commands/mobile/touchAction', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite "touchAction" command', () => {
        addTouchAction(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'touchAction', sinon.match.func);
    });

    it('should call original "touchAction" if only one argument is passed', async () => {
        const origTouchAction = browser.touchAction;
        const action = {some: 'action'};

        addTouchAction(browser);
        await browser.touchAction(action);

        assert.calledOnceWithExactly(origTouchAction, action);
        assert.notCalled(findElement);
    });

    it('should get element by passed selector', async () => {
        addTouchAction(browser);

        await browser.touchAction('.some-selector', {some: 'action'});

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "touchAction" on found browser element', async () => {
        const element = mkElement_({id: 123});
        const origTouchAction = browser.touchAction;
        const action = {some: 'action'};

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addTouchAction(browser);

        await browser.touchAction('.some-selector', action);

        assert.calledOnceWithExactly(element.touchAction, action);
        assert.notCalled(origTouchAction);
    });
});
