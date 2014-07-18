var path    = require('path');
var init    = require('../../../lib/commands/init');
var Promise = require('../../../lib/ext/promise');
var stub    = require('../../helpers/stub');

var tmp    = require('tmp-sync');
var tmpDir = tmp.in(path.join(__dirname, '..', '..'));
tmp.mark(tmpDir);

init.project = {
  root: tmpDir,
  name: function() {
    "test-project"
  }
};

describe('Commands - Init', function() {
  beforeEach(function() {
    init.setupEmber = stub(init, 'setupEmber')
  });

  it('calls the setup methods', function(done) {
    var setupEmber      = stub(init, 'setupEmber', Promise.resolve());
    var setupCordova    = stub(init, 'setupCordova', Promise.resolve());
    var linkEnvironment = stub(init, 'linkEnvironment', Promise.resolve());

    init.run(null, ['com.test.app']).then(function() {
      expect(setupEmber.called).to.eql(1);
      expect(setupCordova.called).to.eql(1);
      expect(linkEnvironment.called).to.eql(1);
      done();
    });
  });
});
