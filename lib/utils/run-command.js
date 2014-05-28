'use strict';

var exec  = require('child_process').exec;
var chalk = require('chalk');
var ui    = require('../ui');

module.exports = function runCommand(command, startedMsg, endedMsg) {
  if(endedMsg == null) {
    endedMsg = 'done';
  }
  return function(callback) {
    ui.write('\n');
    ui.pleasantProgress.start(startedMsg);
    return exec(command, function(err, stdout, stdin){
      if(err) {
        ui.write(chalk.red(stdout) + '\n');
        throw err;
      }

      ui.write(chalk.green(endedMsg));

      if(callback) {
        callback(err, stdout);
      }
    });
  };
};
