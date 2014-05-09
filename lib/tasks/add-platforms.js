var runCommand = require('../utils/run-command');

module.exports = function(config) {

  var addIosPlatformCommand = 'cd ' + config.get('projectPath') + '; cordova platforms add ios';

  return runCommand(addIosPlatformCommand, 'Adding ios platform to cordova...');
}
