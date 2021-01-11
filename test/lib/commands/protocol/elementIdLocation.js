'use strict';

const addElementIdLocation = require('lib/commands/protocol/elementIdLocation');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdLocation" command', () => {
    it('should add "elementIdLocation" command', () => {
        const browser = mkBrowser_();

        addElementIdLocation(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdLocation', sinon.match.func);
    });

    it('should call "getElementLocation" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdLocation(browser);
        await browser.elementIdLocation('element-id');

        assert.calledOnceWithExactly(browser.getElementLocation, 'element-id');
    });
});
