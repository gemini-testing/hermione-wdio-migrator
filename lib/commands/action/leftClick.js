'use strict';

const findElement = require('../../helpers/findElement');

module.exports = (browser) => {
    browser.addCommand('leftClick', async function(selector, x, y) {
        const elem = await findElement(this, selector);

        // positionClick does not work correctly in mobile with jsonwp
        if (this.isMobile && !this.isW3C) {
            await elem.moveTo({xOffset: x, yOffset: y});

            return elem.click();
        }

        return elem.click({button: 'left', x, y});
    });
};
