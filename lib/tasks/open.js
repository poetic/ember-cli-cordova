'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(project) {
  var projectPath, command;

  projectPath = path.join(project.root, 'cordova', 'platforms/ios/*.xcodeproj');

  command = 'open ' + projectPath;
  return runCommand(command, 'Opening ios project with the default application');
};
