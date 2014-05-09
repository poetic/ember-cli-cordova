var runCommand = require('../utils/run-command');

module.exports = function(config) {

  var projectPath = config.get('projectPath');
  var name   = config.get('name');

  var emberCommand = 'cd ' + projectPath
                        + '; mkdir ember; cd ember; ember init ' + name
                        + '; ember build';

  return runCommand(emberCommand,   "Creating Ember project...");
}
