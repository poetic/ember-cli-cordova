describe('Tasks - Build', function() {
  var project, commandOffset;
  beforeEach(function() {
    project       = newProject();
    commandOffset = 0;
  });

  describe('env argument', function() {
    it('development - runs proper commands', function() {
      var commands = [
        'ember build --environment development',
        'cordova build ios'
      ];

      var build = proxyquire('../../lib/tasks/build', {
        '../utils/run-command': function(command) {
          expect(command).to.eql(commands[commandOffset++]);
          return resolveFn;
        },
        '../tasks/link-environment': function() {
          return resolveFn;
        }
      });

      return build('development', 'ios', project)();
    });

    it('production - runs proper commands', function() {
      var commands = [
        'ember build --environment production',
        'cordova build ios --release'
      ];

      var build = proxyquire('../../lib/tasks/build', {
        '../utils/run-command': function(command) {
          expect(command).to.eql(commands[commandOffset++]);
          return resolveFn;
        },
        '../tasks/link-environment': function() {
          return resolveFn;
        }
      });

      return build('production', 'ios', project)();
    });
  });

  describe('platform argument', function() {
    it('development - runs proper commands', function() {
      var commands = [
        'ember build --environment development',
        'cordova build android'
      ];

      var build = proxyquire('../../lib/tasks/build', {
        '../utils/run-command': function(command) {
          expect(command).to.eql(commands[commandOffset++]);
          return resolveFn;
        },
        '../tasks/link-environment': function() {
          return resolveFn;
        }
      });

      return build('development', 'android', project)();
    });

    it('production - runs proper commands', function() {
      var commands = [
        'ember build --environment production',
        'cordova build android --release'
      ];

      var build = proxyquire('../../lib/tasks/build', {
        '../utils/run-command': function(command) {
          expect(command).to.eql(commands[commandOffset++]);
          return resolveFn;
        },
        '../tasks/link-environment': function() {
          return resolveFn;
        }
      });

      return build('production', 'android', project)();
    });
  });
});
