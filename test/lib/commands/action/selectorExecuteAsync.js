'use strict';

const addSelectorExecuteAsync = require('lib/commands/action/selectorExecuteAsync');
const {mkBrowser_} = require('../../../utils');

describe('"selectorExecuteAsync" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
        global.document = {
            querySelector: sinon.stub().returns('default-dom-elem')
        };

        browser.execute.callsFake((handler, ...args) => handler(...args));
    });

    afterEach(() => {
        global.document = undefined;
        sinon.restore();
    });

    it('should add "selectorExecuteAsync" command', () => {
        addSelectorExecuteAsync(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'selectorExecuteAsync', sinon.match.func);
    });

    it('should get first dom-element for each passed selector', async () => {
        addSelectorExecuteAsync(browser);

        await browser.selectorExecuteAsync(['.some-selector-1', '.some-selector-2']);

        assert.calledTwice(global.document.querySelector);
        assert.calledWith(global.document.querySelector.firstCall, '.some-selector-1');
        assert.calledWith(global.document.querySelector.secondCall, '.some-selector-2');
    });

    it('should call "executeAsync" on browser with passed script, found dom-elements and other passed args', async () => {
        const domElement1 = 'some-dom-elem-1';
        const domElement2 = 'some-dom-elem-2';
        const script = () => { };

        global.document.querySelector
            .withArgs('.some-selector-1').returns(domElement1)
            .withArgs('.some-selector-2').returns(domElement2);
        addSelectorExecuteAsync(browser);

        await browser.selectorExecuteAsync(['.some-selector-1', '.some-selector-2'], script, 'arg1', 'arg2');

        assert.calledOnceWithExactly(browser.executeAsync, script, domElement1, domElement2, 'arg1', 'arg2');
    });
});
