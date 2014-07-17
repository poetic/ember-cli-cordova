var expect            = require('chai').expect;
var path              = require('path');
var ProjectWithConfig = require('../../../lib/models/project-with-config');

describe('Model - ProjectWithConfig', function() {
  var project;

  beforeEach(function() {
    project = {
      root: path.join(__dirname, '..', '..', 'fixtures/project')
    }
  });

  it('adds the ember cdv config instance', function() {
    project = ProjectWithConfig(project);
    expect(project.cdvConfig.get('name')).to.equal('TestApp');
  });

  it('throws a ProjectNotFoundError', function() {
    project.root = '/bad/path/that/doesnt/exist';
    var badFn = function() { return ProjectWithConfig(project); }
    expect(badFn).to.throw('you must be inside an ember-cdv project');
  });
});
