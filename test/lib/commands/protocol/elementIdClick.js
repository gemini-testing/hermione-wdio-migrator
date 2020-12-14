'use strict';

const addElementIdClick = require('lib/commands/protocol/elementIdClick');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdClick" command', () => {
    it('should add "elementIdClick" command', () => {
        const browser = mkBrowser_();

        addElementIdClick(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdClick', sinon.match.func);
    });

    it('should call "elementClick" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdClick(browser);
        await browser.elementIdClick('element-id');

        assert.calledOnceWithExactly(browser.elementClick, 'element-id');
    });
});
