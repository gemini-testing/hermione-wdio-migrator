'use strict';

const addAlertText = require('lib/commands/protocol/alertText');
const {mkBrowser_} = require('../../../utils');

describe('"alertText" command', () => {
    it('should add "alertText" command', () => {
        const browser = mkBrowser_();

        addAlertText(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'alertText', sinon.match.func);
    });

    it('should call "getAlertText" if text is not passed', async () => {
        const browser = mkBrowser_();

        addAlertText(browser);
        await browser.alertText();

        assert.calledOnceWithExactly(browser.getAlertText);
    });

    it('should call "sendAlertText" if text is passed', async () => {
        const browser = mkBrowser_();

        addAlertText(browser);
        await browser.alertText('text');

        assert.calledOnceWithExactly(browser.sendAlertText, 'text');
    });
});
