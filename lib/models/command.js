var chalk = require('chalk');

function Command(options) {
  this.options = options;
  this.args    = {};
}

Command.prototype.toString = function() {
  return '[Command ' + this.name + ']';
}

Command.prototype.validateArguments = function() {
  throw new Error('you must override validateArguments');
}

Command.prototype.displayUsage = function() {
  console.log(chalk.cyan('Usage: ember-cdv ' + this.name));
  if(this.usage) {
    console.log(this.usage.join('\n'));
  }
}

Command.prototype.validateAndRun = function() {
  if(this.validateArguments()) {
    this.run();
  } else {
    console.log(chalk.red.underline('Invalid or missing arguments\n'))
    this.displayUsage();
  }
}

module.exports = Command
