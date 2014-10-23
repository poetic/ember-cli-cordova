'use strict';

var runCommand = require('../utils/run-command');
var getOpenCommand = require('../utils/open');
var path = require('path');

module.exports = function(project, platform, application) {
  var projectPath, command;
  if (platform === 'ios') {
    projectPath = path.join(project.root, 'cordova', 'platforms/ios/*.xcodeproj');
  } else if (platform === 'android') {
    projectPath = path.join(project.root, 'cordova', 'platforms/android/.project');
  }
  var command = null;
  if(application){
    command = getOpenCommand(projectPath,application);
  }else{
    command = getOpenCommand(projectPath);
  }
  return runCommand(command, 'Opening '+platform+' project with the default application');
};
