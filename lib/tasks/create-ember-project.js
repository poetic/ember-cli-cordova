'use strict';

var runCommand = require('../utils/run-command');

module.exports = function(config) {

  var root = config.get('root');
  var name        = config.get('name');

  var command = 'cd ' + root
                        + '; mkdir ember; cd ember; ember init ' + name
                        + '; ember build';

  return runCommand(command, 'Creating Ember project');
};
