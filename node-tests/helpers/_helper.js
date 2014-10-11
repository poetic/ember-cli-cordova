global.expect = require('chai').expect;

// Requiring a relative path will need to be relative to THIS file path
global.proxyquire = require('proxyquire');

global.Promise = require('../../lib/ext/promise');
global.noop    = require('./noop');

global.resolveFn = function() { return Promise.resolve() };

global.newProject = function() {
  return {
    cordovaConfig: {
      id: 'com.poetic.test-app',
      name: 'TestApp'
    },
    root: 'project-root'
  }
}
