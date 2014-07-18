var mocks = require('../../helpers/mocks');

describe('Tasks - Copy Hooks', function() {
  it('copies to the correct path', function(done) {
    var copyHooks = proxyquire('../../lib/tasks/copy-hooks', {
      'fs-extra': {
        copy: function(fromPath, toPath, callback){
          expect(fromPath).to.match(/cordova\/hooks$/);
          expect(toPath).to.match(/test\/cordova\/hooks$/);
          done();
          return Promise.resolve();
        }
      },
      '../ext/promise': mocks.Promise,
      '../ui': mocks.ui
    });

    copyHooks({root: 'test'})();
  });
});
