'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(project) {
  var config = project.cordovaConfig;
  var name   = config.name;
  var id     = config.id;

  var command = 'cordova create cordova ' + id + ' ' + name;

  return runCommand(command, 'Creating Cordova project', {
    cwd: project.root
  });
};
