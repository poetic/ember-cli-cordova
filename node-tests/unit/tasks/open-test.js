describe('Tasks - Open', function() {
  var project;
  beforeEach(function() {
    project = newProject();
  });

  describe('darwin', function() {
    it('runs correct command', function() {
      var open = proxyquire('../../lib/tasks/open', {
        '../utils/run-command': function(command) {
          expect(command).to.eql('open project-root/cordova/platforms/ios/*.xcodeproj');
        }
      });

      return open(project);
    });
  });
});
