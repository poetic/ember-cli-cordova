'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(platform, project) {
  var projectPath, command;

  if(platform === 'ios') {
    projectPath = path.join(project.root, 'platforms/ios/*.xcodeproj');
  }

  command = 'open ' + projectPath;
  return runCommand(command, 'Opening ios project with the default application');
};
