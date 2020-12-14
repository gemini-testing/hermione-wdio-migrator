'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"isEnabled" command', () => {
    let browser, findElement, addIsEnabled;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addIsEnabled = proxyquire('lib/commands/state/isEnabled', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "isEnabled" command', () => {
        addIsEnabled(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'isEnabled', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addIsEnabled(browser);

        await browser.isEnabled('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "isEnabled" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addIsEnabled(browser);

        await browser.isEnabled('.some-selector');

        assert.calledOnceWithExactly(element.isEnabled);
    });
});
