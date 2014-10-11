describe('Tasks - Verify Dist', function() {
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

  it('resolves when path exists', function() {
    var verifyDist = proxyquire('../../lib/tasks/verify-dist', {
      'fs': {
        existsSync: function() { return true; }
      }
    });

    return verifyDist(project)().then(function() {
      expect(true).to.be.ok;
    });
  });

  it('runs ember build when it doesn\'t exist', function() {
    var verifyDist = proxyquire('../../lib/tasks/verify-dist', {
      '../utils/run-command': function(command) {
        expect(command).to.eql('ember build');
      }
    });

    return verifyDist(project);
  });
});
