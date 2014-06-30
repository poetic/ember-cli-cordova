'use strict';

var runCommand = require('../utils/run-command');

var dependencies = [
  'broccoli-sass',
  'ember-cli-simple-auth'
];

module.exports = function(project) {
  var command = 'npm install -D ' + dependencies.join(' ');

  return runCommand(command,   'Installing npm dependencies', {
    cwd: project.root
  });
};
