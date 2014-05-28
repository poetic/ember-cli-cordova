'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(config) {

  var projectPath = config.get('projectPath');
  var name        = config.get('name');
  var id          = config.get('id');
  var dirName     = path.basename(projectPath);

  var command = 'cordova create ' + dirName + ' '
                        + id + ' ' + name;
  return runCommand(command, 'Creating Cordova project');
};
