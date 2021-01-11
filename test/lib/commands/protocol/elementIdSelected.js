'use strict';

const addElementIdSelected = require('lib/commands/protocol/elementIdSelected');
const {mkBrowser_} = require('../../../utils');

describe('"elementIdSelected" command', () => {
    it('should add "elementIdSelected" command', () => {
        const browser = mkBrowser_();

        addElementIdSelected(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'elementIdSelected', sinon.match.func);
    });

    it('should call "isElementSelected" with passed element id', async () => {
        const browser = mkBrowser_();

        addElementIdSelected(browser);
        await browser.elementIdSelected('element-id');

        assert.calledOnceWithExactly(browser.isElementSelected, 'element-id');
    });
});
