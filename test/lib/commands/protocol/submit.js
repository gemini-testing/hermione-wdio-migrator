'use strict';

const addSubmit = require('lib/commands/protocol/submit');
const {mkBrowser_} = require('../../../utils');

describe('"submit" command', () => {
    it('should add "submit" command', () => {
        const browser = mkBrowser_();

        addSubmit(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'submit', sinon.match.func);
    });

    it('should call "elementSubmit" with passed element id', async () => {
        const browser = mkBrowser_();

        addSubmit(browser);
        await browser.submit('some-element-id');

        assert.calledOnceWithExactly(browser.elementSubmit, 'some-element-id');
    });
});
