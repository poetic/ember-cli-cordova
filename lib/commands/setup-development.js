var path     = require('path');
var setupEnv = require('../tasks/setup-environment');

module.exports = function() {
  var cdvAppPath    = path.join(process.cwd(), 'app');
  var emberDevPath  = path.join(cdvAppPath, 'ember', 'tmp', 'output');

  setupEnv(emberDevPath);
}

