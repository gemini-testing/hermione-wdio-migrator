'use strict';

const addDoDoubleClick = require('lib/commands/protocol/doDoubleClick');
const {mkBrowser_} = require('../../../utils');

describe('"doDoubleClick" command', () => {
    it('should add "doDoubleClick" command', () => {
        const browser = mkBrowser_();

        addDoDoubleClick(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'doDoubleClick', sinon.match.func);
    });

    it('should call "positionDoubleClick"', async () => {
        const browser = mkBrowser_();

        addDoDoubleClick(browser);
        await browser.doDoubleClick();

        assert.calledOnceWithExactly(browser.positionDoubleClick);
    });
});
