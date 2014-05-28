var fs    = require('fs-extra');
var chalk = require('chalk');
var path  = require('path');
var ui    = require('../ui');

module.exports = function(config) {
  var projectPath = config.get('projectPath');
  var templatesPath = path.join(__dirname, '../..', 'templates');

  return function(callback) {
    var destination = path.join(projectPath, 'ember');
    var source = path.join(templatesPath, 'ember');

    ui.write('\n');
    ui.pleasantProgress.start('Copying custom ember files to new ember-cli project');

    if(fs.existsSync(source)) {
      fs.copy(source, destination, function(err) {
        if(err) callback(err);
        ui.write(chalk.green('done'));
        callback(null);
      });
    } else {
      ui.write(chalk.green('done'));
      callback(null);
    }
  }
}
