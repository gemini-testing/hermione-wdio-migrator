'use strict';

const addElementIdSize = require('lib/commands/protocol/elementIdSize');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdSize" command', () => {
    it('should add "elementIdSize" command', () => {
        const browser = mkBrowser_();

        addElementIdSize(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdSize', sinon.match.func);
    });

    it('should call "getElementSize" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdSize(browser);
        await browser.elementIdSize('element-id');

        assert.calledOnceWithExactly(browser.getElementSize, 'element-id');
    });
});
