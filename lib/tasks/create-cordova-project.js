'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(config) {
  var name    = config.get('name');
  var id      = config.get('id');

  var command = 'cordova create cordova ' + id + ' ' + name;
  return runCommand(command, 'Creating Cordova project', {
    cwd: config.get('root')
  });
};
