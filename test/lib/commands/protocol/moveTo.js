'use strict';

const addMoveTo = require('lib/commands/protocol/moveTo');
const {mkBrowser_} = require('../../../utils');

describe('"moveTo" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    it('should add "moveTo" command', () => {
        addMoveTo(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'moveTo', sinon.match.func);
    });

    describe('browser does not support w3c protocol', () => {
        beforeEach(() => {
            browser.isW3C = false;
        });

        it('should call "moveToElement" with passed element and offsets', async () => {
            addMoveTo(browser);

            await browser.moveTo('some-element', 100, 200);

            assert.calledOnceWithExactly(browser.moveToElement, 'some-element', 100, 200);
        });
    });

    describe('browser support w3c protocol', () => {
        beforeEach(() => {
            browser.isW3C = true;
            browser.moveToElement = undefined;
        });

        it('should throw error if "moveToElement" does not exists', async () => {
            addMoveTo(browser);

            await assert.isRejected(
                browser.moveTo('some-element', 100, 200),
                'Use "moveTo" command on element or "moveToObject" on browser'
            );
        });
    });
});
