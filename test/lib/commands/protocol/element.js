'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"element" command', () => {
    let browser, findElement, addElement;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addElement = proxyquire('lib/commands/protocol/element', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "element" command', () => {
        addElement(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'element', sinon.match.func);
    });

    it('should call "findElement" helper with browser and passed selector', async () => {
        addElement(browser);

        await browser.element('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });
});
