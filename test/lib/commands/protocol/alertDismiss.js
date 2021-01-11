'use strict';

const addAlertDismiss = require('lib/commands/protocol/alertDismiss');
const {mkBrowser_} = require('../../../utils');

describe('"alertDismiss" command', () => {
    it('should add "alertDismiss" command', () => {
        const browser = mkBrowser_();

        addAlertDismiss(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'alertDismiss', sinon.match.func);
    });

    it('should call "dismissAlert"', async () => {
        const browser = mkBrowser_();

        addAlertDismiss(browser);
        await browser.alertDismiss();

        assert.calledOnceWithExactly(browser.dismissAlert);
    });
});
