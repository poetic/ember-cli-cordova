'use strict';

var runCommand = require('../utils/run-command');

module.exports = function(config) {

  var command = 'cd ' + config.get('root')
                + '; git init && git add . && git commit -m "ember-cdv project created"';

  return runCommand(command, 'Initializing git repository and committing changes');
};
