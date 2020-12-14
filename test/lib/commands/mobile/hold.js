'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"hold" command', () => {
    let browser, findElement, addHold;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addHold = proxyquire('lib/commands/mobile/hold', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "hold" command', () => {
        addHold(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'hold', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addHold(browser);

        await browser.hold('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "touchLongClick" on browser element', async () => {
        const element = mkElement_({id: 'some-id'});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addHold(browser);

        await browser.hold('.some-selector');

        assert.calledOnceWithExactly(browser.touchLongClick, 'some-id');
    });
});
