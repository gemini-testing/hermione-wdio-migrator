'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getLocationInView" command', () => {
    let browser, findElement, addGetLocationInView;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetLocationInView = proxyquire('lib/commands/property/getLocationInView', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getLocationInView" command', () => {
        addGetLocationInView(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getLocationInView', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetLocationInView(browser);

        await browser.getLocationInView('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getElementLocationInView" with element id', async () => {
        const browser = mkBrowser_();
        const element = mkElement_({id: 123});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetLocationInView(browser);

        await browser.getLocationInView('.some-selector');

        assert.calledOnceWithExactly(browser.getElementLocationInView, 123);
    });
});
