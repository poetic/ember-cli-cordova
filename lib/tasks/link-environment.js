var exec  = require('child_process').exec;
var path  = require('path');
var chalk = require('chalk');
var fs    = require('fs-extra');

function notInProject() {
  console.log(chalk.red.underline("Error: You must be in a directory with a .ember-cdv file to run this command"));
}

module.exports = function(emberPath, projectPath){

  var projectPath = projectPath || process.cwd()

  var configPath = path.join(projectPath, '.ember-cdv');
  var emberPath  = path.join(projectPath, emberPath);
  var wwwPath    = path.join(projectPath, 'www');

  if(!fs.existsSync(configPath)) {
    notInProject();
    return;
  }

  console.log('');
  process.stdout.write("Symlinking ember dir to cordova www...");

  fs.removeSync(wwwPath);
  fs.symlinkSync(emberPath, wwwPath, 'dir');

  process.stdout.write(chalk.green("done\n"));

}

