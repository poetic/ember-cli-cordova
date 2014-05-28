'use strict';

var chalk   = require('chalk');
var fs      = require('fs');
var path    = require('path');
var Command = require('../models/command');
var ui      = require('../ui');

module.exports = Command.extend({
  name: 'help',
  run: function(){
    ui.write('Available commands for ember-cdv:\n');
    fs.readdir(__dirname, function(err, files){
      files.forEach(function(file){
        if(path.basename(file) !== 'help.js') {
          command = new (require('./' + file))();
          command.displayHelp();
          ui.write('\n');
        }
      });
    });
  }
});
