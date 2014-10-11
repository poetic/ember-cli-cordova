global.expect = require('chai').expect;

// Requiring a relative path will need to be relative to THIS file path
global.proxyquire = require('proxyquire');

global.Promise = require('../../lib/ext/promise');
