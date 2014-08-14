var expect            = require('chai').expect;
var path              = require('path');
var projectWithConfig = require('../../../lib/models/project-with-config');

describe('Model - ProjectWithConfig', function() {
  var project;

  beforeEach(function() {
    project = {
      root: path.join(__dirname, '..', '..', 'fixtures/project'),
      name: function() {}
    }
  });

  it('adds the ember cordova config instance', function() {
    project = projectWithConfig(project);
    expect(project.cordovaConfig.id).to.equal('com.example.app');
  });
});
