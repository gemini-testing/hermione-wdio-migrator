'use strict';

const addSwipeLeft = require('lib/commands/mobile/swipeLeft');
const {DEFAULT_OFFSET, DEFAULT_SPEED} = require('lib/constants');
const {mkBrowser_} = require('../../../utils');

describe('"swipeLeft" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    afterEach(() => sinon.restore());

    it('should add "swipeLeft" command', () => {
        addSwipeLeft(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'swipeLeft', sinon.match.func);
    });

    it('should use default "xOffset" and "speed" if they have not been passed', async () => {
        addSwipeLeft(browser);

        await browser.swipeLeft('.some-selector');

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', -DEFAULT_OFFSET, 0, DEFAULT_SPEED);
    });

    it('should transform passed "xOffset" param to negative value', async () => {
        addSwipeLeft(browser);

        await browser.swipeLeft('.some-selector', 100);

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', -100, 0, sinon.match.number);
    });

    it('should call "swipe" with all passed args', async () => {
        addSwipeLeft(browser);

        await browser.swipeLeft('.some-selector', -200, 300);

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', -200, 0, 300);
    });
});
