'use strict';

const proxyquire = require('proxyquire');
const {mkBrowser_, mkElement_} = require('../../../utils');

describe('"chooseFile" command', () => {
    let browser, findElement, addChooseFile;

    beforeEach(() => {
        browser = mkBrowser_();
        findElement = sinon.stub().resolves(mkElement_());
        addChooseFile = proxyquire('lib/commands/utility/chooseFile', {
            '../../helpers/findElement': findElement
        });
    });

    afterEach(() => sinon.restore());

    it('should add "chooseFile" command', () => {
        addChooseFile(browser);

        assert.calledOnceWithExactly(browser.addCommand, 'chooseFile', sinon.match.func);
    });

    it('should upload file to remote server', async () => {
        addChooseFile(browser);

        await browser.chooseFile('.some-selector', '/local/file.png');

        assert.calledOnceWithExactly(browser.uploadFile, '/local/file.png');
    });

    it('should get element by passed selector', async () => {
        addChooseFile(browser);

        await browser.chooseFile('.some-selector');

        assert.calledOnceWithExactly(findElement, browser, '.some-selector');
    });

    it('should add uploaded file path to passed selector', async () => {
        const browser = mkBrowser_();
        const element = mkElement_();

        findElement.withArgs(browser, '.some-selector').resolves(element);
        browser.uploadFile.withArgs('/local/file.png').resolves('/remote/file.png');
        addChooseFile(browser);

        await browser.chooseFile('.some-selector', '/local/file.png');

        assert.calledOnceWithExactly(element.addValue, '/remote/file.png');
    });
});
