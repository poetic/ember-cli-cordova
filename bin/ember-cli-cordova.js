#!/usr/bin/env node
'use strict';

var fs              = require('fs');
var path            = require('path');
var chalk           = require('chalk');
var options         = require('minimist')(process.argv.slice(2));
var emberCDVVersion = require('../lib/utils/ember-cdv-version');
var ui              = require('../lib/ui');

var userCommand     = options._[0];
var userCommandPath = path.join(__dirname, '../lib/commands', userCommand + '.js');
var command;

ui.write('version: ' + emberCDVVersion() + '\n\n');
fs.exists(userCommandPath, function(exists){
  if(exists) {
    command = new (require('../lib/commands/' + userCommand))(options);

    if(options._[1] === 'help' || options.h) {
      command.displayHelp();
      ui.write('\n');
    }
    else {
      command.validateAndRun();
    }
  } else {
    ui.write(chalk.red.underline('Error: Unknown command'));
    var command = new (require('../lib/commands/help'))();
    command.validateAndRun();
  }
});

