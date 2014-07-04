'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(project) {

  var cordovaPath = path.join(__dirname, '..', '..', 'node_modules', 'cordova', 'bin', 'cordova');
  var command     = cordovaPath + ' platforms add ios';

  return runCommand(command, 'Adding ios platform to cordova', {
    cwd: path.join(project.root, 'cordova')
  });
};
