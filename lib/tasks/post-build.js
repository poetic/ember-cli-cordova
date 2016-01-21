'use strict';

var runCommand      = require('../utils/run-command');
var defaultPlatform = require('../utils/default-platform');
var path            = require('path');
var chalk           = require('chalk');
var ui              = require('../ui');
var Promise         = require('../ext/promise');

function createCommand(project, options) {
  var platform = options.platform || defaultPlatform(project);
  var command  = 'cordova build ' + platform;

  if (options.emulate) {
    command += ' && cordova emulate ' + platform;

    if (options.emulateTarget) {
      if (options.emulateTarget[platform]) {
        command += ' --target="' + options.emulateTarget[platform] + '"';
      }
    }
  }

  return runCommand(command, null, {
    cwd: path.join(project.root, 'cordova')
  });
}

module.exports = function(project, options) {
  if (!options.rebuildOnChange) {
    return function() {};
  }

  return function() {
    var rebuild = createCommand(project, options)();

    rebuild.then(function() {
      ui.write(chalk.green('Cordova build successful.\n'));
    });

    return Promise.resolve();
  }
};
