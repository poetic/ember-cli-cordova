#!/usr/bin/env node

var fs      = require('fs');
var path    = require('path');
var chalk   = require('chalk');
var options = require('minimist')(process.argv.slice(2));

var command     = options._[0];
var commandPath = path.join(__dirname, 'lib', 'commands', command + '.js');

console.log(chalk.cyan('::Ember CLI Cordova::'));

fs.exists(commandPath, function(exists){
  if(exists) {
    require('./lib/commands/' + command)(options);
  } else {
    console.log(chalk.red.underline("Error: Unknown command"));
    require('./lib/commands/help')();
  }
});

