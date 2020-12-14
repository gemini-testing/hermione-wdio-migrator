'use strict';

const addAlertAccept = require('lib/commands/protocol/alertAccept');
const {mkBrowser_} = require('../../../utils');

describe('"alertAccept" command', () => {
    it('should add "alertAccept" command', () => {
        const browser = mkBrowser_();

        addAlertAccept(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'alertAccept', sinon.match.func);
    });

    it('should call "acceptAlert"', async () => {
        const browser = mkBrowser_();

        addAlertAccept(browser);
        await browser.alertAccept();

        assert.calledOnceWithExactly(browser.acceptAlert);
    });
});
