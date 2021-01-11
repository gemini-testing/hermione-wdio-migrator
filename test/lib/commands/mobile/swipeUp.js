'use strict';

const addSwipeUp = require('lib/commands/mobile/swipeUp');
const {DEFAULT_OFFSET, DEFAULT_SPEED} = require('lib/constants');
const {mkBrowser_} = require('../../../utils');

describe('"swipeUp" command', () => {
    let browser;

    beforeEach(() => {
        browser = mkBrowser_();
    });

    afterEach(() => sinon.restore());

    it('should add "swipeUp" command', () => {
        addSwipeUp(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'swipeUp', sinon.match.func);
    });

    it('should use default "yOffset" and "speed" if they have not been passed', async () => {
        addSwipeUp(browser);

        await browser.swipeUp('.some-selector');

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', 0, DEFAULT_OFFSET * -1, DEFAULT_SPEED);
    });

    it('should transform passed "yOffset" param to negative value', async () => {
        addSwipeUp(browser);

        await browser.swipeUp('.some-selector', 100);

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', 0, -100, sinon.match.number);
    });

    it('should call "swipe" with all passed args', async () => {
        addSwipeUp(browser);

        await browser.swipeUp('.some-selector', -200, 300);

        assert.calledOnceWithExactly(browser.swipe, '.some-selector', 0, -200, 300);
    });
});
