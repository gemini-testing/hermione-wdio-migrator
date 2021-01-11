'use strict';

const addTitle = require('lib/commands/protocol/title');
const {mkBrowser_} = require('../../../utils');

describe('"title" command', () => {
    it('should add "title" command', () => {
        const browser = mkBrowser_();

        addTitle(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'title', sinon.match.func);
    });

    it('should call "getTitle"', async () => {
        const browser = mkBrowser_();

        addTitle(browser);
        await browser.title();

        assert.calledOnceWithExactly(browser.getTitle);
    });
});
