var noop = require('../../helpers/noop');
var RSVP = require('rsvp');

var resolveFn = function() { return RSVP.resolve() };

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
      './cordova': proxyquire('../../lib/tasks/cordova', {
        '../utils/run-command': function(command) {
          expect(command).to.eql('cordova create cordova com.poetic.test-app TestApp');
          return resolveFn;
        }
      })
    });

    return createProject(project)();
  });

  it('should execute in proper folder', function() {
    var createProject = proxyquire('../../lib/tasks/create-cordova-project', {
      './cordova': proxyquire('../../lib/tasks/cordova', {
        '../utils/run-command': function(_, _, options) {
          expect(options.cwd).to.equal('project-root/cordova');
          return resolveFn;
        }
      })
    });

    return createProject(project)();
  });
});
