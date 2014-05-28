'use strict';

var chalk = require('chalk');
var _     = require('lodash');
var ui    = require('../ui');

function Command(options) {
  options      = options || {}
  this.options = _.omit(options, '_') || {};
  this.rawArgs = options._ || [];
  this.args    = {};

  this._parseArgs();
  this._parseOptions();
};

Command.__proto__ = require('./core-object');

Command.prototype.toString = function() {
  return '[Command ' + this.name + ']';
};

// Private method
Command.prototype._parseOptions = function() {
  return this.parseOptions();
};

// Private method
Command.prototype._parseArgs = function() {
  if(this.rawArgs.length) {
    this.args.command = this.rawArgs.slice(0, 1);
  }
  return this.parseArgs();
};

// This should be overridden if you want to provide defaults or fallbacks on the
// options
Command.prototype.parseOptions = function() {
  return this.options;
};

// This should be overridden if you want to populate defaults or fallbacks on the
// args object
Command.prototype.parseArgs = function() {
  return this.args;
};

// This should be overridden if you have any custom validations to do on
// a command's options
Command.prototype.validateOptions = function() {
  return true;
};

// This should be overridden if you have any custom argument validation
Command.prototype.validateArgs = function() {
  return true;
};

Command.prototype.displayHelp = function() {
  var commandHelp = '\nember-cdv ' + this.name;
  if(this.commandSuffix) {
    commandHelp += chalk.yellow(' ' + this.commandSuffix);
  }
  ui.write(commandHelp + '\n')

  if(this.description) {
    ui.write('  ' + this.description + '\n');
  }

  if(this.optionsHelp) {
    ui.write('  ' + chalk.cyan(this.optionsHelp.join('\n  ')));
  }
};

Command.prototype.validateAndRun = function() {
  if(this.validateArgs() && this.validateOptions()) {
    this.run();
  } else {
    ui.write(chalk.red.underline('Invalid or missing arguments\n\n'))
    this.displayHelp();
  }
};

module.exports = Command;
