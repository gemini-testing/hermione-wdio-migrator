'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"buttonUp" command', () => {
    let browser, getMouseButtonNameNumber, getPerformActionId, addButtonUp;

    beforeEach(() => {
        browser = mkBrowser_();
        getMouseButtonNameNumber = sinon.stub().returns(0);
        getPerformActionId = sinon.stub().returns('some-id');

        addButtonUp = proxyquire('lib/commands/protocol/buttonUp', {
            '../../helpers/getMouseButtonNameNumber': getMouseButtonNameNumber,
            '../../helpers/getPerformActionId': getPerformActionId
        });
    });

    afterEach(() => sinon.restore());

    describe('should not add "buttonUp" command', () => {
        it('if browser does not support w3c protocol', () => {
            browser.isW3C = false;
            browser.buttonUp = undefined;

            addButtonUp(browser);

            assert.notCalled(browser.addCommand);
        });

        it('if browser already has command', () => {
            browser.isW3C = true;
            browser.buttonUp = sinon.stub().named('buttonUp').resolves();

            addButtonUp(browser);

            assert.notCalled(browser.addCommand);
        });
    });

    describe('should not overwrite "buttonUp" command', () => {
        it('if browser does not support w3c protocol', () => {
            browser.isW3C = false;
            browser.buttonUp = sinon.stub().named('buttonUp').resolves();

            addButtonUp(browser);

            assert.notCalled(browser.overwriteCommand);
        });

        it('if browser doesn\'t have command', () => {
            browser.isW3C = true;
            browser.buttonUp = null;

            addButtonUp(browser);

            assert.notCalled(browser.overwriteCommand);
        });
    });

    it('should add "buttonUp" command if browser doesn\'t have it', () => {
        browser.isW3C = true;
        browser.buttonUp = undefined;

        addButtonUp(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'buttonUp', sinon.match.func);
    });

    it('should overwrite "buttonUp" command if browser already has it', () => {
        browser.isW3C = true;
        browser.buttonUp = () => {};

        addButtonUp(browser);

        assert.calledOnceWithExactly(browser.overwriteCommand, 'buttonUp', sinon.match.func);
    });

    for (const isCommandSet of [true, false]) {
        describe(`if command is ${isCommandSet ? '' : 'not '}set`, () => {
            it('should call "buttonUp" with correct args', async () => {
                browser.isW3C = true;
                browser.buttonUp = undefined;
                getMouseButtonNameNumber.withArgs('left').returns(0);
                getPerformActionId.withArgs(browser).returns('some-pointer-id');

                addButtonUp(browser);

                await browser.buttonUp('left');

                assert.calledOnceWithExactly(browser.performActions, [{
                    type: 'pointer',
                    id: 'some-pointer-id',
                    parameters: {pointerType: 'mouse'},
                    actions: [
                        {type: 'pointerUp', button: 0}
                    ]
                }]);
            });
        });
    }
});
