'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"keys" command', () => {
    let browser, overwriteExistingCommand, overwriteKeys;

    beforeEach(() => {
        browser = mkBrowser_();
        overwriteExistingCommand = sinon.stub().callsFake((browser, name, command) => {
            browser[name] = command.bind(browser, browser[name]);
        });
        overwriteKeys = proxyquire('lib/commands/protocol/keys', {
            '../../helpers/overwriteExistingCommand': overwriteExistingCommand
        });
    });

    afterEach(() => sinon.restore());

    it('should overwrite existing "keys" command', () => {
        overwriteKeys(browser);

        assert.calledOnceWithExactly(overwriteExistingCommand, browser, 'keys', sinon.match.func);
    });

    describe('should call original "keys" with passed value for', () => {
        [
            {name: 'not android', isW3C: true, isAndroid: false},
            {name: 'android with jwp support', isW3C: false, isAndroid: true}
        ].forEach(({name, isW3C, isAndroid}) => {
            it(name, async () => {
                browser.isW3C = isW3C;
                browser.isAndroid = isAndroid;
                const origKeys = browser.keys;

                overwriteKeys(browser);
                await browser.keys('text');

                assert.calledOnceWithExactly(origKeys, 'text');
            });
        });
    });

    describe('for android with w3c support', () => {
        beforeEach(() => {
            browser.isW3C = true;
            browser.isAndroid = true;
        });

        it('should call "sendKeys" with passed value wrapped in array', async () => {
            overwriteKeys(browser);

            await browser.keys('text');

            assert.calledOnceWithExactly(browser.sendKeys, ['text']);
        });
    });
});
