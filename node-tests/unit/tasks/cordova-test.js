describe('Tasks - Cordova', function() {
  it('creates a proper command', function() {
    var cordova = proxyquire('../../lib/tasks/cordova', {
      '../utils/run-command': function(command, msg, options){
        expect(command).to.match(/cordova plugins add org\.apache\.test$/);
        return noop;
      },
    });

    return cordova(['plugins', 'add', 'org.apache.test'], { root: 'test' })();
  });

  it('executes in proper directory', function() {
    var cordova = proxyquire('../../lib/tasks/cordova', {
      '../utils/run-command': function(command, msg, options){
        expect(options.cwd).to.match(/test\/cordova$/);
        return noop;
      },
    });

    return cordova(['plugins', 'add', 'org.apache.test'], { root: 'test' })();
  });
});
