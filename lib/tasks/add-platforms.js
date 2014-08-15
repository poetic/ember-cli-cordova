'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(project, options) {
  var command = 'cordova platforms add ' + options.platform;

  return runCommand(command, 'Adding ' + options.platform + ' platform to cordova', {
    cwd: path.join(project.root, 'cordova')
  });
};
