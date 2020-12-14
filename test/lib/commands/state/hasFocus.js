'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"hasFocus" command', () => {
    let browser, findElement, addHasFocus;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addHasFocus = proxyquire('lib/commands/state/hasFocus', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "hasFocus" command', () => {
        addHasFocus(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'hasFocus', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addHasFocus(browser);

        await browser.hasFocus('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "isFocused" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addHasFocus(browser);

        await browser.hasFocus('.some-selector');

        assert.calledOnceWithExactly(element.isFocused);
    });
});
