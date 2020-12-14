'use strict';

const addLocation = require('lib/commands/protocol/location');
const {mkBrowser_} = require('../../../utils');

describe('"location" command', () => {
    it('should add "location" command', () => {
        const browser = mkBrowser_();

        addLocation(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'location', sinon.match.func);
    });

    it('should call "getGeoLocation" if location is not passed', async () => {
        const browser = mkBrowser_();

        addLocation(browser);
        await browser.location();

        assert.calledOnceWithExactly(browser.getGeoLocation);
    });

    it('should call "setGeoLocation" if location is passed', async () => {
        const browser = mkBrowser_();

        addLocation(browser);
        await browser.location('some-location');

        assert.calledOnceWithExactly(browser.setGeoLocation, 'some-location');
    });
});
