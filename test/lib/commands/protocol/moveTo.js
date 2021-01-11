'use strict';

const addMoveTo = require('lib/commands/protocol/moveTo');
const {mkBrowser_} = require('../../../utils');

describe('"moveTo" command', () => {
    it('should add "moveTo" command', () => {
        const browser = mkBrowser_();

        addMoveTo(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'moveTo', sinon.match.func);
    });

    it('should call "moveToElement" with passed element and offsets', async () => {
        const browser = mkBrowser_();

        addMoveTo(browser);
        await browser.moveTo('some-element', 100, 200);

        assert.calledOnceWithExactly(browser.moveToElement, 'some-element', 100, 200);
    });
});
