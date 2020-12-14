'use strict';

module.exports = (browser) => {
    browser.addCommand('location', function(location) {
        return location
            ? this.setGeoLocation(location)
            : this.getGeoLocation();
    });
};
