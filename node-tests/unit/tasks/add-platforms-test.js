describe('Tasks - Add Platforms', function() {
  it('creates the proper command', function() {
    var addPlatforms = proxyquire('../../lib/tasks/add-platforms', {
      '../utils/run-command': function(command) {
        expect(command).to.contain('platforms add some-platform');
      }
    });

    addPlatforms({root: 'test'}, {platform: 'some-platform'});
  });

  it('executes command in cordova directory', function() {
    var addPlatforms = proxyquire('../../lib/tasks/add-platforms', {
      '../utils/run-command': function(_, __, options) {
        expect(options.cwd).to.equal('test/cordova');
      }
    });

    addPlatforms({root: 'test'}, {platform: 'some-platform'});
  });
});
