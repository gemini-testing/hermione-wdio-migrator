'use strict';

module.exports = (browser) => {
    browser.addCommand('elementIdSelected', function(elementId) {
        return this.isElementSelected(elementId);
    });
};
