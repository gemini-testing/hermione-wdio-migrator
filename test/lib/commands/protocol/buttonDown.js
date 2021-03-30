'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_} = require('../../../utils');

describe('"buttonDown" command', () => {
    let browser, getMouseButtonNameNumber, getPerformActionId, addButtonDown;

    beforeEach(() => {
        browser = mkBrowser_();
        getMouseButtonNameNumber = sinon.stub().returns(0);
        getPerformActionId = sinon.stub().returns('some-id');

        addButtonDown = proxyquire('lib/commands/protocol/buttonDown', {
            '../../helpers/getMouseButtonNameNumber': getMouseButtonNameNumber,
            '../../helpers/getPerformActionId': getPerformActionId
        });
    });

    afterEach(() => sinon.restore());

    describe('should not add "buttondDown" command', () => {
        it('if browser does not support w3c protocol', () => {
            browser.isW3C = false;
            browser.buttonDown = undefined;

            addButtonDown(browser);

            assert.notCalled(browser.addCommand);
        });

        it('if browser already has command', () => {
            browser.isW3C = true;
            browser.buttonDown = sinon.stub().named('buttonDown').resolves();

            addButtonDown(browser);

            assert.notCalled(browser.addCommand);
        });
    });

    it('should add "buttondDown" command', () => {
        browser.isW3C = true;
        browser.buttonDown = undefined;

        addButtonDown(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'buttonDown', sinon.match.func);
    });

    it('should call "buttonDown" with correct args', async () => {
        browser.isW3C = true;
        browser.buttonDown = undefined;
        getMouseButtonNameNumber.withArgs('left').returns(0);
        getPerformActionId.withArgs(browser).returns('some-pointer-id');

        addButtonDown(browser);

        await browser.buttonDown('left');

        assert.calledOnceWithExactly(browser.performActions, [{
            type: 'pointer',
            id: 'some-pointer-id',
            parameters: {pointerType: 'mouse'},
            actions: [
                {type: 'pointerDown', button: 0}
            ]
        }]);
    });
});
