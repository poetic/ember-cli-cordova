'use strict';

var Promise = require('../ext/promise');
var exec    = Promise.denodeify(require('child_process').exec);
var chalk   = require('chalk');
var ui      = require('../ui');

module.exports = function runCommand(command, startedMsg) {
  return function() {
    ui.write('\n');
    ui.pleasantProgress.start(startedMsg);

    return exec(command, { maxBuffer: 1000 * 1024 }).then(function() {
      ui.write(chalk.green('done'));
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

