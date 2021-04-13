'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"leftClick" command', () => {
    let browser, findElement, addLeftClick;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addLeftClick = proxyquire('lib/commands/action/leftClick', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "leftClick" command', () => {
        addLeftClick(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'leftClick', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addLeftClick(browser);

        await browser.leftClick('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    [
        {
            name: 'exec in ios with w3c support',
            isIOS: true,
            isW3C: true
        },
        {
            name: 'exec not in ios with w3c support',
            isIOS: false,
            isW3C: true
        },
        {
            name: 'exec not in ios without w3c support',
            isIOS: false,
            isW3C: false
        }
    ].forEach(({name, isIOS, isW3C}) => {
        describe(name, () => {
            it('should call "click" on browser element with correct options', async () => {
                browser.isIOS = isIOS;
                browser.isW3C = isW3C;
                const element = mkElement_();

                findElement.withArgs(browser, '.some-selector').resolves(element);
                addLeftClick(browser);

                await browser.leftClick('.some-selector', 100, 200);

                assert.calledOnceWithExactly(element.click, {button: 'left', x: 100, y: 200});
            });
        });
    });

    describe('exec in ios without w3c support', () => {
        beforeEach(() => {
            browser.isIOS = true;
            browser.isW3C = false;
        });

        it('should call "moveTo" on browser element with passed offsets', async () => {
            const element = mkElement_();

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addLeftClick(browser);

            await browser.leftClick('.some-selector', 100, 200);

            assert.calledOnceWithExactly(element.moveTo, {xOffset: 100, yOffset: 200});
        });

        it('should call "click" on browser element after move to it', async () => {
            const element = mkElement_();

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addLeftClick(browser);

            await browser.leftClick('.some-selector', 100, 200);

            assert.callOrder(element.moveTo, element.click);
            assert.calledOnceWithExactly(element.click);
        });
    });
});
