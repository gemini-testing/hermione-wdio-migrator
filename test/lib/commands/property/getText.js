'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getText" command', () => {
    let browser, findElement, addGetText;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetText = proxyquire('lib/commands/property/getText', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getText" command', () => {
        addGetText(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getText', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetText(browser);

        await browser.getText('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getText" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetText(browser);

        await browser.getText('.some-selector');

        assert.calledOnceWithExactly(element.getText);
    });
});
