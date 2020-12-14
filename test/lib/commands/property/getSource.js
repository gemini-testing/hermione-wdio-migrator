'use strict';

const addGetSource = require('lib/commands/property/getSource');
const {mkBrowser_} = require('../../../utils');

describe('"getSource" command', () => {
    it('should add "getSource" command', () => {
        const browser = mkBrowser_();

        addGetSource(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getSource', sinon.match.func);
    });

    it('should call "getPageSource"', async () => {
        const browser = mkBrowser_();

        addGetSource(browser);
        await browser.getSource();

        assert.calledOnceWithExactly(browser.getPageSource);
    });
});
