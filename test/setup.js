'use strict';

const path = require('path');
const chai = require('chai');
const sinon = require('sinon');

global.sinon = sinon;
global.assert = chai.assert;

chai.use(require('chai-as-promised'));
sinon.assert.expose(chai.assert, {prefix: ''});

require('app-module-path').addPath(path.resolve(__dirname, '..'));
