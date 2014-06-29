'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(project) {

  var command = 'cordova platforms add ios';

  return runCommand(command, 'Adding ios platform to cordova', {
    cwd: path.join(project.root, 'cordova')
  });
};
