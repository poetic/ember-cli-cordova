'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(config) {

  var root = config.get('root');
  var name        = config.get('name');
  var id          = config.get('id');
  var dirName     = path.basename(root);

  var command = 'cordova create ' + dirName + ' '
                        + id + ' ' + name;
  return runCommand(command, 'Creating Cordova project');
};
