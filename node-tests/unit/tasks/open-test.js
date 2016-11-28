describe('Tasks - Open', function() {
  var project;
  beforeEach(function() {
    project = newProject();
  });

  it('rejects when the platform isn\'t supported', function() {
    var open = proxyquire('../../lib/tasks/open', {});

    return open(project, 'fake-platform').catch(function(err) {
      expect(err.toString()).to.match(/platform is not supported/);
    });
  });

  describe('runs correct command on each platform', function() {
    var platform;
    before(function() {
      platform = process.platform;
    });

    after(function() {
      process.platform = platform;
    });

    describe('darwin', function() {
      beforeEach(function() {
        process.platform = 'darwin';
      });

      it('ios', function() {
        return assertOpenCommand(project, 'ios', 'open project-root/cordova/platforms/ios/*.xcodeproj');
      });

      it('android', function() {
        return assertOpenCommand(project, 'android', 'open project-root/cordova/platforms/android/.project');
      });
    });

    describe('win32', function() {
      beforeEach(function() {
        process.platform = 'win32';
      });

      it('ios', function() {
        return assertOpenCommand(project, 'ios', 'start project-root/cordova/platforms/ios/*.xcodeproj');
      });

      it('android', function() {
        return assertOpenCommand(project, 'android', 'start project-root/cordova/platforms/android/.project');
      });
    });

    describe('other', function() {
      beforeEach(function() {
        process.platform = 'other';
      });

      it('ios', function() {
        return assertOpenCommand(project, 'ios', 'xdg-open project-root/cordova/platforms/ios/*.xcodeproj');
      });

      it('android', function() {
        return assertOpenCommand(project, 'android', 'xdg-open project-root/cordova/platforms/android/.project');
      });
    });
  });
});

function assertOpenCommand(project, platform, assertion) {
  var open = proxyquire('../../lib/tasks/open', {
    '../utils/run-command': function(command) {
      expect(command).to.eql(assertion);
    }
  });
  return open(project, platform);
}
