var path     = require('path');
var setupEnv = require('../tasks/setup-environment');

module.exports = function() {
  var cdvAppPath    = path.join(process.cwd(), 'app');
  var emberDistPath = path.join(cdvAppPath, 'ember', 'dist');

  setupEnv(emberDistPath);
}

