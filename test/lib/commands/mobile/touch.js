'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"touch" command', () => {
    let browser, findElement, addTouch;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addTouch = proxyquire('lib/commands/mobile/touch', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "touch" command', () => {
        addTouch(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'touch', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addTouch(browser);

        await browser.touch('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "touchClick" with element id if "longClick" param is not passed', async () => {
        const browser = mkBrowser_();
        const element = mkElement_({id: 123});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addTouch(browser);

        await browser.touch('.some-selector');

        assert.calledOnceWithExactly(browser.touchClick, 123);
    });

    it('should call "touchLongClick" with element id if "longClick" param is passed as truthy', async () => {
        const browser = mkBrowser_();
        const element = mkElement_({id: 123});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addTouch(browser);

        await browser.touch('.some-selector', true);

        assert.calledOnceWithExactly(browser.touchLongClick, 123);
    });
});
