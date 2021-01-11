'use strict';

const addRotate = require('lib/commands/mobile/rotate');
const {mkBrowser_} = require('../../../utils');

describe('"rotate" command', () => {
    it('should add "rotate" command', () => {
        const browser = mkBrowser_();

        addRotate(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'rotate', sinon.match.func);
    });

    it('should call "rotateDevice" with correct args', async () => {
        const browser = mkBrowser_();

        addRotate(browser);
        await browser.rotate(1, 2, 3, 4, 5, 6);

        assert.calledOnceWithExactly(browser.rotateDevice, 1, 2, 3, 4, 5, 6);
    });
});
