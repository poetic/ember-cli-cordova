'use strict';

var Promise  = require('../ext/promise');
var exec     = require('child_process').exec;
var chalk    = require('chalk');
var ui       = require('../ui');
var defaults = require('lodash').defaults;

module.exports = function runCommand(command, startedMsg, options) {
  if(options == null) {
    options = {}
  }

  return function() {
    if(startedMsg) {
      ui.start(chalk.green(startedMsg));
    }

    options = defaults(options, {
      maxBuffer: 5000 * 1024
    });

    return new Promise(function(resolve, reject) {
      exec(command, options, function(err, stdout, stderr) {
        ui.write('\n');

        if (stdout && stdout.length) {
          ui.write(stdout);
        }

        if (stderr && stderr.length) {
          ui.write(stderr);
        }

        if (err) {
          return reject(commandError(command, err));
        }

        resolve(stdout);
      });
    });
  };
};

function commandError(command, err) {
  ui.write(chalk.red('\nError thrown while running shell command: "' + command + '"\n'));
  if(err.stack) {
    ui.write(err.stack);
  } else {
    ui.write(err);
  }
}

