var exec  = require('child_process').exec;
var path  = require('path');
var chalk = require('chalk');
var fs    = require('fs-extra');

function notInProject() {
  console.log(chalk.red.underline("Error: You must be in a directory with a .ember-cli-cordova file to run this command"));
}

module.exports = function(emberPath){

  var wwwPath             = path.join(process.cwd(), 'www');
  var emberCliCordovaPath = path.join(process.cwd(), '.ember-cli-cordova')

  fs.exists(emberCliCordovaPath, function(exists){
    if(!exists) {
      notInProject();
      return;
    }

    process.stdout.write("Symlinking ember dir to cordova www...");

    fs.remove(wwwPath, function(err){
      fs.symlink(emberPath, wwwPath, 'dir', function(err){
        if(err) throw err;
        process.stdout.write(chalk.green("done\n"));
      });
    });

  });

}

