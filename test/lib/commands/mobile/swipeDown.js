'use strict';

const addSwipeDown = require('lib/commands/mobile/swipeDown');
const {DEFAULT_OFFSET, DEFAULT_SPEED} = require('lib/constants');
const {mkBrowser_} = require('../../../utils');

describe('"swipeDown" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    afterEach(() => sinon.restore());

    it('should add "swipeDown" command', () => {
        addSwipeDown(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'swipeDown', sinon.match.func);
    });

    it('should use default "yOffset" and "speed" if they have not been passed', async () => {
        addSwipeDown(browser);

        await browser.swipeDown('.some-selector');

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', 0, DEFAULT_OFFSET, DEFAULT_SPEED);
    });

    it('should transform passed "yOffset" param to positive value', async () => {
        addSwipeDown(browser);

        await browser.swipeDown('.some-selector', -100);

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', 0, 100, sinon.match.number);
    });

    it('should call "swipe" with all passed args', async () => {
        addSwipeDown(browser);

        await browser.swipeDown('.some-selector', 200, 300);

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', 0, 200, 300);
    });
});
