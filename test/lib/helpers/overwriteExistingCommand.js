'use strict';

const overwriteExistingCommand = require('lib/helpers/overwriteExistingCommand');
const {mkBrowser_} = require('../../utils');

describe('"overwriteExistingCommand" helper', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    afterEach(() => sinon.restore());

    it('should not overwite command if it does not exists', () => {
        overwriteExistingCommand(browser, 'nonExistentCmd');

        assert.notCalled(browser.overwriteCommand);
    });

    it('should not overwrite command if it is not a function', () => {
        browser.someProp = 'prop';

        overwriteExistingCommand(browser, 'someProp');

        assert.notCalled(browser.overwriteCommand);
    });

    it('should overwrite command', () => {
        browser.existentCmd = () => {};
        const handler = () => {};

        overwriteExistingCommand(browser, 'existentCmd', handler);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'existentCmd', handler);
    });
});
