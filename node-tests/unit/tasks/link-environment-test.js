describe('Tasks - Link Environment', function() {
  var project;
  beforeEach(function() {
    project = newProject();
  });

  before(function() {
    process._chdir = process.chdir;
    process.chdir = noop;
  });

  after(function() {
    process.chdir = process._chdir;
  });

  it('removes the cordova/www dir', function() {
    var createProject = proxyquire('../../lib/tasks/link-environment', {
      './verify-dist': function() { return resolveFn; },
      'fs-extra': {
        remove: function(path, callback) {
          expect(path).to.eql('project-root/cordova/www');
          return callback(null, true);
        },
        symlink: function(from, to, type, _, callback) {
          return callback(null, true);
        }
      }
    });

    return createProject(project)();
  });

  it('creates a relative dir symlink', function() {
    var createProject = proxyquire('../../lib/tasks/link-environment', {
      './verify-dist': function() { return resolveFn; },
      'fs-extra': {
        remove: function(path, callback) {
          return callback(null, true);
        },
        symlink: function(from, to, type, _, callback) {
          expect(from).to.eql('../dist');
          expect(to).to.eql('www');
          expect(type).to.eql('dir');
          return callback(null, true);
        }
      }
    });

    return createProject(project)();
  });
});
