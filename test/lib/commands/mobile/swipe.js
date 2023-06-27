'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"swipe" command', () => {
    let browser, findElement, addSwipe, getPerformActionId;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        getPerformActionId = sinon.stub().returns('some-id');
        addSwipe = proxyquire('lib/commands/mobile/swipe', {
            '../../helpers/findElement': findElement,
            '../../helpers/getPerformActionId': getPerformActionId
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

    it('should call "touchFlick" with offsets, found element id and speed in non W3C mode', async () => {
        const browser = mkBrowser_();
        browser.isW3C = false;
        const element = mkElement_({id: 123});

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSwipe(browser);

        await browser.swipe('.some-selector', 100, 200, 300);

        assert.calledOnceWithExactly(browser.touchFlick, 100, 200, 123, 300);
    });

    it('should call performActions in W3C mode', async () => {
        const browser = mkBrowser_();
        browser.isW3C = true;
        const element = mkElement_({id: 123});

        getPerformActionId.withArgs(browser).returns('some-pointer-id');
        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSwipe(browser);

        await browser.swipe('.some-selector', 100, 0, 100);

        assert.calledOnceWithExactly(browser.performActions, [{
            type: 'pointer',
            id: getPerformActionId(browser),
            parameters: {pointerType: 'touch'},
            actions: [
                {type: 'pointerMove', duration: 0, origin: element, x: 0, y: 0},
                {type: 'pointerDown', button: 0},
                {type: 'pointerMove', duration: 1000, origin: element, x: 100, y: 0},
                {type: 'pointerUp', button: 0}
            ]
        }]);
    });
});
