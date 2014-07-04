'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');
var chalk      = require('chalk');
var ui         = require('../ui');
var Promise    = require('../ext/promise');

function createCommand(project, options) {
  var platform    = options.platform || 'ios';
  var cordovaPath = path.join(__dirname, '..', '..', 'node_modules', 'cordova', 'bin', 'cordova');
  var command     = cordovaPath + ' build ' + platform;

  if (options.emulate) {
    command += ' && cordova emulate ' + platform;
  }

  var msg = options.rebuildAsync ? null : 'Rebuilding cordova project';

  return runCommand(command, msg, {
    cwd: path.join(project.root, 'cordova')
  });
}

module.exports = function(project, options) {
  if (!options.rebuildOnChange) {
    return function() {};
  }

  return function() {
    var rebuild = createCommand(project, options)();

    if (options.rebuildAsync) {
      rebuild.then(function() {
        ui.write(chalk.green('Cordova build successful.\n'));
      });

      return Promise.resolve();
    }

    return rebuild;
  }
};
