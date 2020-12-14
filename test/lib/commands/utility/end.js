'use strict';

const addEnd = require('lib/commands/utility/end');
const {mkBrowser_} = require('../../../utils');

describe('"end" command', () => {
    it('should add "end" command', () => {
        const browser = mkBrowser_();

        addEnd(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'end', sinon.match.func);
    });

    it('should call "deleteSession"', async () => {
        const browser = mkBrowser_();

        addEnd(browser);
        await browser.end();

        assert.calledOnceWithExactly(browser.deleteSession);
    });
});
