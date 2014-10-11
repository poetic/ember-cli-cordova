describe('Tasks - Create cordova project', function() {
  var project;

  beforeEach(function() {
    project = {
      cordovaConfig: {
        id: 'com.poetic.test-app',
        name: 'TestApp'
      },
      root: 'project-root'
    };
  });

  it('creates the proper command', function() {
    var createProject = proxyquire('../../lib/tasks/create-cordova-project', {
      '../utils/run-command': function(command) {
        expect(command).to.contain('create cordova com.poetic.test-app TestApp');
      }
    });

    createProject(project);
  });

  it('should execute in proper folder', function() {
    var createProject = proxyquire('../../lib/tasks/create-cordova-project', {
      '../utils/run-command': function(_, __, options) {
        expect(options.cwd).to.equal('project-root');
      }
    });

    createProject(project);
  });
});
