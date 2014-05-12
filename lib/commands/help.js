var chalk   = require('chalk');
var fs      = require('fs');
var path    = require('path');
var Command = require('../models/command');

module.exports = Command.extend({
  name: 'help',
  run: function(){
    console.log('Available commands for ember-cdv:');
    fs.readdir(__dirname, function(err, files){
      files.forEach(function(file){
        if(path.basename(file) !== 'help.js') {
          command = new (require('./' + file))();
          command.displayHelp();
        }
      });
      console.log();
    });
  }
});
