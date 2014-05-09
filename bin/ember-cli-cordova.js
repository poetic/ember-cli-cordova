#!/usr/bin/env node

var fs      = require('fs');
var path    = require('path');
var chalk   = require('chalk');
var options = require('minimist')(process.argv.slice(2));

var command     = options._[0];
var commandPath = path.join(__dirname, '..', 'lib', 'commands', command + '.js');

fs.exists(commandPath, function(exists){
  if(exists) {
    if(command === 'help') {
      require('../lib/commands/help')();
    } else if(options._[1] === 'help' || options.h) {
      require('../lib/commands/' + command)(options).displayUsage();
    }
    else {
      require('../lib/commands/' + command)(options).validateAndRun();
    }
  } else {
    console.log(chalk.red.underline("Error: Unknown command"));
    require('../lib/commands/help')();
  }
});

