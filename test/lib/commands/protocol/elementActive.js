'use strict';

const addElementActive = require('lib/commands/protocol/elementActive');
const {mkBrowser_} = require('../../../utils');

describe('"elementActive" command', () => {
    it('should add "elementActive" command', () => {
        const browser = mkBrowser_();

        addElementActive(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementActive', sinon.match.func);
    });

    it('should call "getActiveElement"', async () => {
        const browser = mkBrowser_();

        addElementActive(browser);
        await browser.elementActive();

        assert.calledOnceWithExactly(browser.getActiveElement);
    });
});
