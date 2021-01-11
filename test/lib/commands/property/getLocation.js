'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getLocation" command', () => {
    let browser, findElement, addGetLocation;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetLocation = proxyquire('lib/commands/property/getLocation', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getLocation" command', () => {
        addGetLocation(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getLocation', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetLocation(browser);

        await browser.getLocation('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getLocation" on browser element with passed args', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetLocation(browser);

        await browser.getLocation('.some-selector', 'x');

        assert.calledOnceWithExactly(element.getLocation, 'x');
    });
});
