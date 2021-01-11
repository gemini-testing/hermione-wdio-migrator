'use strict';

const addTouchMultiPerform = require('lib/commands/mobile/touchMultiPerform');
const {mkBrowser_} = require('../../../utils');

describe('"touchMultiPerform" command', () => {
    it('should add "touchMultiPerform" command', () => {
        const browser = mkBrowser_();

        addTouchMultiPerform(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'touchMultiPerform', sinon.match.func);
    });

    it('should call "multiTouchPerform" with actions and elementId', async () => {
        const browser = mkBrowser_();

        addTouchMultiPerform(browser);
        await browser.touchMultiPerform('some-actions', 'some-element-id');

        assert.calledOnceWithExactly(browser.multiTouchPerform, 'some-actions', 'some-element-id');
    });
});
