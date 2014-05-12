var chalk = require('chalk');

function Command(options) {
  this.options = options || {};
  this.parseOptions(this.options);
}

Command.__proto__ = require('./core-object');

Command.prototype.toString = function() {
  return '[Command ' + this.name + ']';
}

// This should be overridden if you want to provide defaults or fallbacks on the
// options
Command.prototype.parseOptions = function() {
  return this.options;
}

// This should be overridden if you have any custom validations to do on
// a command's options
Command.prototype.validateOptions = function() {
  return true;
}

Command.prototype.displayHelp = function() {
  var commandHelp = 'ember-cdv ' + this.name;
  if(this.commandSuffix) {
    commandHelp += chalk.yellow(' ' + this.commandSuffix);
  }
  console.log(commandHelp)

  if(this.description) {
    console.log('  ' + this.description);
  }

  if(this.optionsHelp) {
    console.log('  ' + chalk.cyan(this.optionsHelp.join('\n  ')));
  }
}

Command.prototype.validateAndRun = function() {
  if(this.validateOptions()) {
    this.run();
  } else {
    console.log(chalk.red.underline('Invalid or missing arguments\n'))
    this.displayHelp();
  }
}

module.exports = Command
