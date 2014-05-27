#!/usr/bin/env node

var fs              = require('fs');
var path            = require('path');
var chalk           = require('chalk');
var options         = require('minimist')(process.argv.slice(2));
var emberCDVVersion = require('../lib/utils/ember-cdv-version');

var userCommand     = options._[0];
var userCommandPath = path.join(__dirname, '..', 'lib', 'commands', userCommand + '.js');
var command;

console.log('version:', emberCDVVersion(), '\n');
fs.exists(userCommandPath, function(exists){
  if(exists) {
    command = new (require('../lib/commands/' + userCommand))(options)

    if(options._[1] === 'help' || options.h) {
      command.displayHelp();
      console.log();
    }
    else {
      command.validateAndRun();
    }
  } else {
    console.log(chalk.red.underline("Error: Unknown command"));
    var command = new (require('../lib/commands/help'))();
    command.validateAndRun();
  }
});

