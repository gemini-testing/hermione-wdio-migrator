'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"submitForm" command', () => {
    let browser, findElement, addSubmitForm;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addSubmitForm = proxyquire('lib/commands/action/submitForm', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "submitForm" command', () => {
        addSubmitForm(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'submitForm', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addSubmitForm(browser);

        await browser.submitForm('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "click" on browser element', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addSubmitForm(browser);

        await browser.submitForm('.some-selector');

        assert.calledOnceWithExactly(element.click);
    });
});
