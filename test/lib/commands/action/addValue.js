'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"addValue" command', () => {
    let browser, findElement, addAddValue;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addAddValue = proxyquire('lib/commands/action/addValue', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "addValue" command', () => {
        addAddValue(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'addValue', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addAddValue(browser);

        await browser.addValue('.some-selector', 'text');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    describe('should call "addValue" on found browser element for', () => {
        [
            {name: 'not ios', isW3C: false, isIOS: false},
            {name: 'ios with w3c support', isW3C: true, isIOS: true}
        ].forEach(({name, isW3C, isIOS}) => {
            it(name, async () => {
                browser.isW3C = isW3C;
                browser.isIOS = isIOS;
                const element = mkElement_();
                findElement.withArgs(browser, '.some-selector').resolves(element);
                addAddValue(browser);

                await browser.addValue('.some-selector', 'text');

                assert.calledOnceWithExactly(element.addValue, 'text');
            });
        });
    });

    describe('for ios with jwp support', () => {
        beforeEach(() => {
            browser.isW3C = false;
            browser.isIOS = true;
        });

        it('should send keys with correct args', async () => {
            const element = mkElement_({id: '100500'});
            findElement.withArgs(browser, '.some-selector').resolves(element);
            addAddValue(browser);

            await browser.addValue('.some-selector', 'text');

            assert.calledOnceWithExactly(browser.elementSendKeys, '100500', 'text');
        });
    });
});
