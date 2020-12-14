'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"release" command', () => {
    let browser, findElement, addRelease;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addRelease = proxyquire('lib/commands/mobile/release', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "release" command', () => {
        addRelease(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'release', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addRelease(browser);

        await browser.release('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "touchAction" on browser element with "release" action', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addRelease(browser);

        await browser.release('.some-selector');

        assert.calledOnceWithExactly(element.touchAction, 'release');
    });
});
