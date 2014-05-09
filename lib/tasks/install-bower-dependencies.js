var runCommand = require('../utils/run-command');

var dependencies = [
  'ember-animated-outlet-mobile',
  'moment',
  'ember-simple-auth'
];

module.exports = function(config) {

  var command = 'cd ' + config.get('projectPath') + '/ember; '
                      + 'bower install --save ' + dependencies.join(' ');

  return runCommand(command, "Installing bower dependencies...");
}
