'use strict';

const addSetImmediateValue = require('lib/commands/mobile/setImmediateValue');
const {mkBrowser_} = require('../../../utils');

describe('"setImmediateValue" command', () => {
    it('should add "setImmediateValue" command', () => {
        const browser = mkBrowser_();

        addSetImmediateValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'setImmediateValue', sinon.match.func);
    });

    it('should call "rotateDevice" with correct args', async () => {
        const browser = mkBrowser_();

        addSetImmediateValue(browser);
        await browser.setImmediateValue('elemId', 'some-value');

        assert.calledOnceWithExactly(browser.setValueImmediate, 'elemId', 'some-value');
    });
});
