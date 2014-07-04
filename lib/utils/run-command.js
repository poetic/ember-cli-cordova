'use strict';

var Promise = require('../ext/promise');
var exec    = Promise.denodeify(require('child_process').exec);
var chalk   = require('chalk');
var ui      = require('../ui');
var defaults = require('lodash').defaults;

module.exports = function runCommand(command, startedMsg, options) {
  if(options == null) {
    options = {}
  }

  return function() {
    if(startedMsg) {
      ui.write('\n');
      ui.pleasantProgress.start(startedMsg);
    }

    options = defaults(options, {
      maxBuffer: 1000 * 1024
    });

    return exec(command, options).then(function() {
      if(startedMsg) {
        ui.write(chalk.green('done'));
      }
    }, error);
  };
};

function error(err) {
  ui.write(chalk.red('\nError thrown while running shell command\n\n'));
  if(err.stack) {
    ui.write(err.stack);
  } else {
    ui.write(err);
  }
}

