'use strict';

const addElementIdClear = require('lib/commands/protocol/elementIdClear');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdClear" command', () => {
    it('should add "elementIdClear" command', () => {
        const browser = mkBrowser_();

        addElementIdClear(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdClear', sinon.match.func);
    });

    it('should call "elementClear" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdClear(browser);
        await browser.elementIdClear('element-id');

        assert.calledOnceWithExactly(browser.elementClear, 'element-id');
    });
});
