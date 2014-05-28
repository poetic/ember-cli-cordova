var exec  = require('child_process').exec;
var path  = require('path');
var chalk = require('chalk');
var fs    = require('fs-extra');
var ui    = require('../ui');

module.exports = function(project, emberOutputPath){
  if(!project) {
    throw new Error('A project must be passed into this function');
  }

  var emberPath  = path.join(project.root, emberOutputPath);
  var wwwPath    = path.join(project.root, 'www');

  ui.write('\n');
  ui.pleasantProgress.start('Symlinking ember dir to cordova www');

  fs.removeSync(wwwPath);
  fs.symlinkSync(emberPath, wwwPath, 'dir');

  ui.write(chalk.green("done"));
}

