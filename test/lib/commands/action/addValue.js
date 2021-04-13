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
            {name: 'not mobile', isW3C: false, isMobile: false},
            {name: 'mobile with w3c support', isW3C: true, isMobile: true}
        ].forEach(({name, isW3C, isMobile}) => {
            it(name, async () => {
                browser.isW3C = isW3C;
                browser.isMobile = isMobile;
                const element = mkElement_();
                findElement.withArgs(browser, '.some-selector').resolves(element);
                addAddValue(browser);

                await browser.addValue('.some-selector', 'text');

                assert.calledOnceWithExactly(element.addValue, 'text');
            });
        });
    });

    describe('for mobile with jwp support', () => {
        beforeEach(() => {
            browser.isW3C = false;
            browser.isMobile = true;
        });

        describe('should send keys with element id and passed value', () => {
            it('as string', async () => {
                const element = mkElement_({id: '100500'});
                findElement.withArgs(browser, '.some-selector').resolves(element);
                addAddValue(browser);

                await browser.addValue('.some-selector', 'text');

                assert.calledOnceWithExactly(browser.elementSendKeys, '100500', 'text');
            });

            it('as array modified to string', async () => {
                const element = mkElement_({id: '100500'});
                findElement.withArgs(browser, '.some-selector').resolves(element);
                addAddValue(browser);

                await browser.addValue('.some-selector', ['text1', 'text2']);

                assert.calledOnceWithExactly(browser.elementSendKeys, '100500', 'text1text2');
            });
        });
    });
});
