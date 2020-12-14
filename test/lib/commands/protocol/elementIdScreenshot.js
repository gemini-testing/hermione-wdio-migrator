'use strict';

const addElementIdScreenshot = require('lib/commands/protocol/elementIdScreenshot');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdScreenshot" command', () => {
    it('should add "elementIdScreenshot" command', () => {
        const browser = mkBrowser_();

        addElementIdScreenshot(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdScreenshot', sinon.match.func);
    });

    it('should call "takeElementScreenshot" with passed element id and scroll', async () => {
        const browser = mkBrowser_();

        addElementIdScreenshot(browser);
        await browser.elementIdScreenshot('element-id', true);

        assert.calledOnceWithExactly(browser.takeElementScreenshot, 'element-id', true);
    });
});
