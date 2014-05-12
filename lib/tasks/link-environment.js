var exec  = require('child_process').exec;
var path  = require('path');
var chalk = require('chalk');
var fs    = require('fs-extra');

module.exports = function(project, emberOutputPath){
  if(!project) {
    throw new Error('A project must be passed into this function');
  }

  var emberPath  = path.join(project.root, emberOutputPath);
  var wwwPath    = path.join(project.root, 'www');

  console.log('');
  process.stdout.write("Symlinking ember dir to cordova www...");

  fs.removeSync(wwwPath);
  fs.symlinkSync(emberPath, wwwPath, 'dir');

  process.stdout.write(chalk.green("done\n"));

}

