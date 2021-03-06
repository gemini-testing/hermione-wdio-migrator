'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"touchAction" command', () => {
    let browser, findElement, overwriteExistingCommand, overwriteTouchAction;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteTouchAction = proxyquire('lib/commands/mobile/touchAction', {
            '../../helpers/findElement': findElement,
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite existing "touchAction" command', () => {
        overwriteTouchAction(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'touchAction', sinon.match.func);
    });

    it('should call original "touchAction" if only one argument is passed', async () => {
        const origTouchAction = browser.touchAction;
        const action = {some: 'action'};

        overwriteTouchAction(browser);
        await browser.touchAction(action);

        assert.calledOnceWithExactly(origTouchAction, action);
        assert.notCalled(findElement);
    });

    it('should get element by passed selector', async () => {
        overwriteTouchAction(browser);

        await browser.touchAction('.some-selector', {some: 'action'});

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "touchAction" on found browser element', async () => {
        const element = mkElement_({id: 123});
        const origTouchAction = browser.touchAction;
        const action = {some: 'action'};

        findElement.withArgs(browser, '.some-selector').resolves(element);
        overwriteTouchAction(browser);

        await browser.touchAction('.some-selector', action);

        assert.calledOnceWithExactly(element.touchAction, action);
        assert.notCalled(origTouchAction);
    });
});
