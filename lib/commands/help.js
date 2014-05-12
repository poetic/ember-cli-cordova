var chalk   = require('chalk');
var fs      = require('fs');
var path    = require('path');
var Command = require('../models/command');

var HelpCommand = Command.extend({
  name: 'help',
  run: function(){
    console.log('Available commands for ember-cdv:');
    fs.readdir(__dirname, function(err, files){
      files.forEach(function(file){
        if(path.basename(file) !== 'help.js') {
          require('./' + file)().displayHelp();
        }
      });
      console.log();
    });
  }
});

module.exports = function(options) {
  return new HelpCommand(options);
}
