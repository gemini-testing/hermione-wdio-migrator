'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"swipe" command', () => {
    let browser, findElement, addSwipe;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addSwipe = proxyquire('lib/commands/mobile/swipe', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "swipe" command', () => {
        addSwipe(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'swipe', sinon.match.func);
    });

    it('should throw error if selector is passed as number', async () => {
        addSwipe(browser);

        await assert.isRejected(
            browser.swipe(100500),
            'Method "swipe" does not implement the functionality "swipe(xspeed, yspeed)"' +
            ' try to use "swipe(selector, xOffset, yOffset, speed)"'
        );
    });

    [
        {name: 'xOffset', args: ['1', 1, 1]},
        {name: 'yOffset', args: [2, '2', 2]},
        {name: 'speed', args: [3, 3, '3']}
    ].forEach(({name, args}) => {
        it(`should throw error if ${name} is passed not as number`, async () => {
            addSwipe(browser);

            await assert.isRejected(
                browser.swipe('.some-selector', ...args),
                'Arguments "xOffset", "yOffset" and "speed" must be a numbers'
            );
        });
    });

    it('should get element by passed selector', async () => {
        addSwipe(browser);

        await browser.swipe('.some-selector', 100, 200, 300);

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "touchFlick" with offsets, found element id and speed', async () => {
        const browser = mkBrowser_();
        const element = mkElement_({id: 123});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSwipe(browser);

        await browser.swipe('.some-selector', 100, 200, 300);

        assert.calledOnceWithExactly(browser.touchFlick, 100, 200, 123, 300);
    });
});
