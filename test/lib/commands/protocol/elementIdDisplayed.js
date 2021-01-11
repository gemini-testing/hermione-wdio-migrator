'use strict';

const addElementIdDisplayed = require('lib/commands/protocol/elementIdDisplayed');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdDisplayed" command', () => {
    it('should add "elementIdDisplayed" command', () => {
        const browser = mkBrowser_();

        addElementIdDisplayed(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdDisplayed', sinon.match.func);
    });

    it('should call "isElementDisplayed" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdDisplayed(browser);
        await browser.elementIdDisplayed('element-id');

        assert.calledOnceWithExactly(browser.isElementDisplayed, 'element-id');
    });
});
