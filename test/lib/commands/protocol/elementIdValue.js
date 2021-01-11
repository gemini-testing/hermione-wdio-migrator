'use strict';

const addElementIdValue = require('lib/commands/protocol/elementIdValue');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdValue" command', () => {
    it('should add "elementIdValue" command', () => {
        const browser = mkBrowser_();

        addElementIdValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdValue', sinon.match.func);
    });

    it('should call "elementSendKeys" with passed element id and value', async () => {
        const browser = mkBrowser_();

        addElementIdValue(browser);
        await browser.elementIdValue('element-id', 'some-value');

        assert.calledOnceWithExactly(browser.elementSendKeys, 'element-id', 'some-value');
    });
});
