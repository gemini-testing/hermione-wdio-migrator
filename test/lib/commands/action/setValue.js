'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"setValue" command', () => {
    let browser, findElement, addSetValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addSetValue = proxyquire('lib/commands/action/setValue', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "setValue" command', () => {
        addSetValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'setValue', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addSetValue(browser);

        await browser.setValue('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    describe('should call "setValue" on found browser element for', () => {
        [
            {name: 'not ios', isW3C: false, isIOS: false},
            {name: 'ios with w3c support', isW3C: true, isIOS: true}
        ].forEach(({name, isW3C, isIOS}) => {
            it(name, async () => {
                browser.isW3C = isW3C;
                browser.isIOS = isIOS;
                const element = mkElement_();
                findElement.withArgs(browser, '.some-selector').resolves(element);
                addSetValue(browser);

                await browser.setValue('.some-selector', 'text');

                assert.calledOnceWithExactly(element.setValue, 'text');
            });
        });
    });

    describe('for ios with jwp support', () => {
        beforeEach(() => {
            browser.isW3C = false;
            browser.isIOS = true;
        });

        it('should clear value before send keys', async () => {
            const element = mkElement_();
            findElement.withArgs(browser, '.some-selector').resolves(element);
            addSetValue(browser);

            await browser.setValue('.some-selector', 'text');

            assert.calledOnceWithExactly(element.clearValue);
            assert.callOrder(element.clearValue, browser.elementSendKeys);
        });

        it('should send keys with correct args', async () => {
            const element = mkElement_({id: '100500'});
            findElement.withArgs(browser, '.some-selector').resolves(element);
            addSetValue(browser);

            await browser.setValue('.some-selector', 'text');

            assert.calledOnceWithExactly(browser.elementSendKeys, '100500', 'text');
        });
    });
});
