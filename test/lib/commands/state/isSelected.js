'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"isSelected" command', () => {
    let browser, findElement, addIsSelected;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addIsSelected = proxyquire('lib/commands/state/isSelected', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "isSelected" command', () => {
        addIsSelected(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'isSelected', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addIsSelected(browser);

        await browser.isSelected('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "isSelected" on browser element', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addIsSelected(browser);

        await browser.isSelected('.some-selector');

        assert.calledOnceWithExactly(element.isSelected);
    });
});
