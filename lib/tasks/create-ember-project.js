'use strict';

var runCommand = require('../utils/run-command');

module.exports = function(config) {

  var projectPath = config.get('projectPath');
  var name        = config.get('name');

  var command = 'cd ' + projectPath
                        + '; mkdir ember; cd ember; ember init ' + name
                        + '; ember build';

  return runCommand(command, 'Creating Ember project');
};
