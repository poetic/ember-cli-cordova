var chalk = require('chalk');
var fs    = require('fs');
var path  = require('path');

module.exports = function(){
  console.log('');
  console.log(chalk.yellow('Available commands:'));
  fs.readdir(__dirname, function(err, files){
    files.forEach(function(file){
      if(path.basename(file) !== 'help.js') {
        require('./' + file)({}).displayUsage();
      }
    })
  });
};
