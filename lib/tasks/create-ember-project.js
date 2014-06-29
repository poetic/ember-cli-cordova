'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(config) {
  var root    = config.get('root');
  var name    = config.get('name');
  var dirName = path.basename(root);

  var command = 'mkdir ' + dirName + ' && cd ' + dirName;

  command += '; ember init ' + name + '; ember build';
  console.log(command);

  return runCommand(command, 'Creating Ember project');
};
