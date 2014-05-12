var exec     = require('child_process').exec;
var chalk    = require('chalk');

module.exports = function runCommand(command, startedMsg, endedMsg) {
  if(endedMsg == null) {
    endedMsg = 'done';
  }
  return function(callback) {
    console.log('');
    process.stdout.write(startedMsg);
    return exec(command, function(err, stdout, stdin){
      if(err) {
        console.log(chalk.red(stdout));
        throw err;
      }

      process.stdout.write(chalk.green(endedMsg));

      if(callback) {
        callback(err, stdout);
      }
    });
  }
}
