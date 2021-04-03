'use strict';

const addSwipeRight = require('lib/commands/mobile/swipeRight');
const {DEFAULT_OFFSET, DEFAULT_SPEED} = require('lib/constants');
const {mkBrowser_} = require('../../../utils');

describe('"swipeRight" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    afterEach(() => sinon.restore());

    it('should add "swipeRight" command', () => {
        addSwipeRight(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'swipeRight', sinon.match.func);
    });

    it('should use default "xOffset" and "speed" if they have not been passed', async () => {
        addSwipeRight(browser);

        await browser.swipeRight('.some-selector');

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', DEFAULT_OFFSET, 0, DEFAULT_SPEED);
    });

    it('should transform passed "xOffset" param to positive value', async () => {
        addSwipeRight(browser);

        await browser.swipeRight('.some-selector', -100);

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', 100, 0, sinon.match.number);
    });

    it('should call "swipe" with all passed args', async () => {
        addSwipeRight(browser);

        await browser.swipeRight('.some-selector', 200, 300);

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', 200, 0, 300);
    });
});
