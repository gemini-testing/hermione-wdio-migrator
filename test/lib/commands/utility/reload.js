'use strict';

const addReload = require('lib/commands/utility/reload');
const {mkBrowser_} = require('../../../utils');

describe('"reload" command', () => {
    it('should add "reload" command', () => {
        const browser = mkBrowser_();

        addReload(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'reload', sinon.match.func);
    });

    it('should call "reloadSession"', async () => {
        const browser = mkBrowser_();

        addReload(browser);
        await browser.reload();

        assert.calledOnceWithExactly(browser.reloadSession);
    });
});
