'use strict';

var Promise = require('../ext/promise');
var chalk   = require('chalk');
var fs      = require('fs');
var readdir = Promise.denodeify(fs.readdir);
var path    = require('path');
var Command = require('../models/command');
var ui      = require('../ui');

module.exports = Command.extend({
  name: 'help',
  run: function(){

    ui.write('Available commands for ember-cdv:\n');

    readdir(__dirname).then(readSuccess, readFail);

    function readSuccess(files) {
      files.forEach(function(file){
        var command;
        if(path.basename(file) !== 'help.js') {
          command = new (require('./' + file))();
          command.displayHelp();
          ui.write('\n');
        }
      });
    }

    function readFail(err) {
      var msg = 'Error reading ' + __dirname + 'from the ember-cdv installation.';
      ui.write(chalk.red(msg));
      throw err;
    }
  }
});
