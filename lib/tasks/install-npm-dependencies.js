'use strict';

var runCommand = require('../utils/run-command');

var dependencies = [
  'broccoli-sass',
  'ember-cli-simple-auth'
];

module.exports = function(config) {

  var command = 'cd ' + config.get('root') + '/ember; '
                      + 'npm install -D ' + dependencies.join(' ');

  return runCommand(command,   'Installing npm dependencies');
};
