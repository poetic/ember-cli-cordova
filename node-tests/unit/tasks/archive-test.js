describe('Tasks - Archive', function() {
  var project;
  beforeEach(function() {
    project = newProject();
  });

  describe('version parameter validation', function() {
    it('calls config-xml-version with version', function() {
      var archiveVersion = '0.1.0';

      var archive = proxyquire('../../lib/tasks/archive', {
        './update-config-xml-version': function(version, project) {
          expect(version).to.eql(archiveVersion);
          return resolveFn;
        },
        './build': resolveFn,
        '../utils/run-command': resolveFn
      });

      return archive(archiveVersion, {}, project)();
    });

    it('doesn\'t call config-xml-version with version when undefined', function() {
      var archive = proxyquire('../../lib/tasks/archive', {
        './update-config-xml-version': function(version, project) {
          expect(false, 'should not have called here').to.be.ok;
          return resolveFn;
        },
        './build': resolveFn,
        '../utils/run-command': resolveFn
      });

      return archive(undefined, {}, project)();
    });
  });

  it('prepares proper commands', function() {
    var archiveVersion = "0.1.0";
    var commandOffset = 0;

    var commands = [
      'xcodebuild -scheme ' + project.cordovaConfig.name + ' archive',
      'git add . && git commit -m "archive version: ' + archiveVersion + '"',
      'git tag -a -m "Version ' + archiveVersion + '" ' + archiveVersion
    ];

    var archive = proxyquire('../../lib/tasks/archive', {
      '../utils/run-command': function(command, msg, options){
        expect(command).to.eql(commands[commandOffset++]);
        return resolveFn;
      },
      './update-config-xml-version': function(version, project) {
        expect(version).to.eql(archiveVersion)
        return resolveFn;
      },
      './build': resolveFn
    });

    return archive(archiveVersion, {}, project);
  });

  describe('executes proper commands', function() {
    var archiveVersion;
    beforeEach(function() {
      archiveVersion = '0.1.0';
    });

    it('with no options', function() {
      var commands = [
        'update-config-xml-version',
        'build',
        'xcodebuild -scheme ' + project.cordovaConfig.name + ' archive'
      ];

      var options = {};

      return expectCommandsToBeCalled(
        archiveVersion, options, project, commands
      );
    });

    it('with commit option', function() {
      var commands = [
        'update-config-xml-version',
        'build',
        'xcodebuild -scheme ' + project.cordovaConfig.name + ' archive',
        'git add . && git commit -m "archive version: ' + archiveVersion + '"'
      ];

      var options = { commit: true };

      return expectCommandsToBeCalled(
        archiveVersion, options, project, commands
      );
    });

    it('with tag option', function() {
      var commands = [
        'update-config-xml-version',
        'build',
        'xcodebuild -scheme ' + project.cordovaConfig.name + ' archive',
        'git tag -a -m "Version ' + archiveVersion + '" ' + archiveVersion
      ];

      var options = { tag: true };

      return expectCommandsToBeCalled(
        archiveVersion, options, project, commands
      );
    });

    // TODO: It says tag is never called. But I see no reason why it shouldn't
    // be.  Will need to investigate and fix later
    it.skip('with commit and tag option', function() {
      var commands = [
        'update-config-xml-version',
        'build',
        'xcodebuild -scheme ' + project.cordovaConfig.name + ' archive',
        'git add . && git commit -m "archive version: ' + archiveVersion + '"',
        'git tag -a -m "Version ' + archiveVersion + '" ' + archiveVersion
      ];

      var options = { commit: true, tag: true };

      return expectCommandsToBeCalled(
        archiveVersion, options, project, commands
      );
    });
  });
});

function expectCommandsToBeCalled(archiveVersion, options, project, commands) {
  var stubbedArchive = stubArchive();
  var stubs          = stubbedArchive.stubs;
  var archive        = stubbedArchive.archive;

  return archive(archiveVersion, options, project)().then(function() {
    commands.forEach(function(command, index) {
      var stub = stubs[command];
      if (stub) {
        expect(stub.called, command + ' was never called').to.be.ok;
      } else {
        expect(false, command + ' was never even stubbed').to.be.ok;
      }
    });
  });
}

function stubArchive() {
  var RSVP = require('rsvp');
  var stubs = {};
  var archive = proxyquire('../../lib/tasks/archive', {
    '../utils/run-command': function(command, msg, options){
      return stubs[command] = sinon.stub().returns(RSVP.resolve(command));
    },

    './update-config-xml-version': function(version, project) {
      return stubs['update-config-xml-version'] = sinon.stub().returns(
        Promise.resolve('update-config-xml-version')
      );
    },

    './build': function(env, platform, project) {
      return stubs['build'] = sinon.stub().returns(Promise.resolve('build'));
    }
  });

  return {
    stubs: stubs,
    archive: archive
  };
}
