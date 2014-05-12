var fs     = require('fs-extra');
var chalk  = require('chalk');
var path   = require('path');

module.exports = function(moduleName, config) {
  var projectPath = config.get('projectPath');
  var templatesPath = path.join(__dirname, '../..', 'templates');

  return function (callback) {
    var destination = path.join(projectPath, 'ember/app', moduleName);
    var source = path.join(templatesPath, 'ember/app', moduleName);

    console.log();
    process.stdout.write('Copying default ember ' + moduleName + ' to ember project...');

    if(fs.existsSync(source)) {
      fs.copy(source, destination, function(err) {
        if(err) callback(err);
        process.stdout.write(chalk.green('done'));
        callback(null);
      });
    } else {
      process.stdout.write(chalk.green('done'));
      callback(null);
    }
  }
}
