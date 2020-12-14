'use strict';

const addApplicationCacheStatus = require('lib/commands/protocol/applicationCacheStatus');
const {mkBrowser_} = require('../../../utils');

describe('"applicationCacheStatus" command', () => {
    it('should add "applicationCacheStatus" command', () => {
        const browser = mkBrowser_();

        addApplicationCacheStatus(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'applicationCacheStatus', sinon.match.func);
    });

    it('should call "getApplicationCacheStatus"', async () => {
        const browser = mkBrowser_();

        addApplicationCacheStatus(browser);
        await browser.applicationCacheStatus();

        assert.calledOnceWithExactly(browser.getApplicationCacheStatus);
    });
});
