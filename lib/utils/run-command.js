'use strict';

var Promise = require('../ext/promise');
var exec    = Promise.denodeify(require('child_process').exec);
var chalk   = require('chalk');
var ui      = require('../ui');

module.exports = function runCommand(command, startedMsg, endedMsg) {
  if(endedMsg == null) {
    endedMsg = 'done';
  }

  return function() {
    ui.write('\n');
    ui.pleasantProgress.start(startedMsg);

    return exec(command).then(function() {
      ui.write(chalk.green(endedMsg));
    }, error);
  };
};

function error(err, stdout, stdin) {
  // TODO: I'm not sure this actually gets stdout as a param...
  ui.write(chalk.red(stdout) + '\n');
  throw err;
}

