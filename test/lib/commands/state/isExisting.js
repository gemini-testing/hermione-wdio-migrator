'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"isExisting" command', () => {
    let browser, findElement, addIsExisting;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addIsExisting = proxyquire('lib/commands/state/isExisting', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "isExisting" command', () => {
        addIsExisting(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'isExisting', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addIsExisting(browser);

        await browser.isExisting('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "isExisting" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addIsExisting(browser);

        await browser.isExisting('.some-selector');

        assert.calledOnceWithExactly(element.isExisting);
    });
});
