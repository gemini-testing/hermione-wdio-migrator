'use strict';

const addButtonPress = require('lib/commands/protocol/buttonPress');
const {mkBrowser_} = require('../../../utils');

describe('"buttonPress" command', () => {
    it('should add "buttonPress" command', () => {
        const browser = mkBrowser_();

        addButtonPress(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'buttonPress', sinon.match.func);
    });

    it('should call "buttonDown" and then "buttonUp" with passed button id', async () => {
        const browser = mkBrowser_();
        browser.buttonDown.resolves(browser);

        addButtonPress(browser);
        await browser.buttonPress(0);

        assert.calledOnceWithExactly(browser.buttonDown, 0);
        assert.calledOnceWithExactly(browser.buttonUp, 0);
        assert.callOrder(browser.buttonDown, browser.buttonUp);
    });
});
