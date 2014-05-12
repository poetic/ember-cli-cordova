var runCommand = require('../utils/run-command');
var path       = require('path');

module.exports = function(env, platform, config) {

  var command = 'cordova build ' + platform;

  var msg = 'Building cordova project for platform ' + platform
              + ' with environment ' + env+ '...';

  if(env === 'production') {
    (new (require('../commands/link-production'))).validateAndRun();
  } else {
    (new (require('../commands/link-development'))).validateAndRun();
  }

  return runCommand(command, msg);
}
