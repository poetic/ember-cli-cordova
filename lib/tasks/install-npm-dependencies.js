var runCommand = require('../utils/run-command');

var dependencies = [
  'broccoli-coffee',
  'broccoli-sass'
];

module.exports = function(config) {

  var command = 'cd ' + config.get('projectPath') + '/ember; '
                      + 'npm install --save ' + dependencies.join(' ');

  return runCommand(command,   "Installing npm dependencies...");
}
