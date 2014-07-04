'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(project) {
  var config = project.cdvConfig;
  var name   = config.get('name');
  var id     = config.get('id');

  var cordovaPath = path.join(__dirname, '..', '..', 'node_modules', 'cordova', 'bin', 'cordova');
  var command     = cordovaPath + ' create cordova ' + id + ' ' + name;

  return runCommand(command, 'Creating Cordova project', {
    cwd: project.root
  });
};
