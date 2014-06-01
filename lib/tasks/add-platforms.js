'use strict';

var runCommand = require('../utils/run-command');

module.exports = function(config) {

  var command = 'cd ' + config.get('root') + '; cordova platforms add ios';

  return runCommand(command, 'Adding ios platform to cordova');
};
