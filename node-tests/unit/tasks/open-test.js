describe('Tasks - Open', function() {
  var project;
  beforeEach(function() {
    project = newProject();
  });

  describe('runs correct command', function() {
    it('ios', function() {
      var open = proxyquire('../../lib/tasks/open', {
        '../utils/run-command': function(command) {
          expect(command).to.eql('xdg-open "project-root/cordova/platforms/ios/*.xcodeproj"');
        }
      });
      return open(project,'ios');
    });
    it('android', function() {
      var open = proxyquire('../../lib/tasks/open', {
        '../utils/run-command': function(command) {
          expect(command).to.eql('xdg-open "project-root/cordova/platforms/android/.project"');
        }
      });
      return open(project,'android');
    });
  });
});
