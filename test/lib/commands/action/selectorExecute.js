'use strict';

const addSelectorExecute = require('lib/commands/action/selectorExecute');
const {mkBrowser_} = require('../../../utils');

describe('"selectorExecute" command', () => {
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

    it('should add "selectorExecute" command', () => {
        addSelectorExecute(browser, () => {});

        assert.calledOnceWithExactly(browser.addCommand, 'selectorExecute', sinon.match.func);
    });

    it('should get first dom-element for each passed selector', async () => {
        addSelectorExecute(browser);

        await browser.selectorExecute(['.some-selector-1', '.some-selector-2'], () => {});

        assert.calledTwice(global.document.querySelector);
        assert.calledWith(global.document.querySelector.firstCall, '.some-selector-1');
        assert.calledWith(global.document.querySelector.secondCall, '.some-selector-2');
    });

    it('should call "execute" on browser with passed script, found dom-elements and other passed args', async () => {
        const domElement1 = 'some-dom-elem-1';
        const domElement2 = 'some-dom-elem-2';
        const script = () => {};

        global.document.querySelector
            .withArgs('.some-selector-1').returns(domElement1)
            .withArgs('.some-selector-2').returns(domElement2);
        addSelectorExecute(browser);

        await browser.selectorExecute(['.some-selector-1', '.some-selector-2'], script, 'arg1', 'arg2');

        assert.calledWithExactly(browser.execute.secondCall, script, domElement1, domElement2, 'arg1', 'arg2');
    });
});
