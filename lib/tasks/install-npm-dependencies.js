'use strict';

var runCommand = require('../utils/run-command');

var dependencies = [
  'broccoli-sass',
  'ember-animated-outlet-mobile'
];

module.exports = function(project) {
  var command = 'npm install --save-dev ' + dependencies.join(' ');

  return runCommand(command,   'Installing npm dependencies', {
    cwd: project.root
  });
};
