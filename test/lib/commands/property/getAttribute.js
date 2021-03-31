'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"getAttribute" command', () => {
    let browser, findElement, addGetAttribute;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addGetAttribute = proxyquire('lib/commands/property/getAttribute', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "getAttribute" command', () => {
        addGetAttribute(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'getAttribute', sinon.match.func);
    });

    it('should get element by passed selector', async () => {
        addGetAttribute(browser);

        await browser.getAttribute('.some-selector', 'method');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should call "getAttribute" on browser element with passed attribute name', async () => {
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        addGetAttribute(browser);

        await browser.getAttribute('.some-selector', 'method');

        assert.calledOnceWithExactly(element.getAttribute, 'method');
    });

    describe('browser does not support w3c protocol', () => {
        beforeEach(() => {
            browser.isW3C = false;
        });

        ['href', 'action'].forEach((attrName) => {
            [
                {name: 'relative url without protocol', url: '//ya.ru'},
                {name: 'relative url without protocol and host', url: '/relative'}
            ].forEach(({name, url}) => {
                it(`should not transform ${name} of "${attrName}" attribute`, async () => {
                    const element = mkElement_();
                    element.getAttribute.withArgs(attrName).resolves(url);

                    findElement.withArgs(browser, '.some-selector').resolves(element);
                    addGetAttribute(browser);

                    const result = await browser.getAttribute('.some-selector', attrName);

                    assert.equal(result, url);
                });
            });
        });
    });

    describe('browser support w3c protocol', () => {
        beforeEach(() => {
            browser.isW3C = true;
        });

        it('should not transform url of not "href" or "action" attributes', async () => {
            const element = mkElement_();
            element.getAttribute.withArgs('some-attr').resolves('/relative');

            findElement.withArgs(browser, '.some-selector').resolves(element);
            addGetAttribute(browser);

            const result = await browser.getAttribute('.some-selector', 'some-attr');

            assert.equal(result, '/relative');
        });

        ['href', 'action'].forEach((attrName) => {
            [
                {
                    name: 'relative url without protocol',
                    url: '//ya.ru',
                    expectedUrl: 'https://ya.ru'},
                {
                    name: 'relative url without protocol and host',
                    url: '/relative',
                    expectedUrl: 'https://foo.bar/relative'
                }
            ].forEach(({name, url, expectedUrl}) => {
                it(`should transform ${name} of "${attrName}" attribute`, async () => {
                    const element = mkElement_();
                    element.getAttribute.withArgs(attrName).resolves(url);

                    findElement.withArgs(browser, '.some-selector').resolves(element);
                    browser.getUrl.resolves('https://foo.bar');
                    addGetAttribute(browser);

                    const result = await browser.getAttribute('.some-selector', attrName);

                    assert.equal(result, expectedUrl);
                });
            });
        });
    });
});
