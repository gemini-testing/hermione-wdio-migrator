'use strict';

const addElementIdRect = require('lib/commands/protocol/elementIdRect');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdRect" command', () => {
    it('should add "elementIdRect" command', () => {
        const browser = mkBrowser_();

        addElementIdRect(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdRect', sinon.match.func);
    });

    it('should call "getElementRect" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdRect(browser);
        await browser.elementIdRect('element-id');

        assert.calledOnceWithExactly(browser.getElementRect, 'element-id');
    });
});
