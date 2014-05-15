var fs     = require('fs-extra');
var chalk  = require('chalk');
var path   = require('path');

module.exports = function(config) {
  var projectPath = config.get('projectPath');
  var templatesPath = path.join(__dirname, '../..', 'templates');

  return function(callback) {
    var destination = path.join(projectPath, 'ember');
    var source = path.join(templatesPath, 'ember');

    process.stdout.write('Copying custom ember files to new ember-cli project...');

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
