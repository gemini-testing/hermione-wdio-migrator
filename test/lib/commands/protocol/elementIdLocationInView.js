'use strict';

const addElementIdLocationInView = require('lib/commands/protocol/elementIdLocationInView');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdLocationInView" command', () => {
    it('should add "elementIdLocationInView" command', () => {
        const browser = mkBrowser_();

        addElementIdLocationInView(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdLocationInView', sinon.match.func);
    });

    it('should call "getElementLocationInView" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdLocationInView(browser);
        await browser.elementIdLocationInView('element-id');

        assert.calledOnceWithExactly(browser.getElementLocationInView, 'element-id');
    });
});
