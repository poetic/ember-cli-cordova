'use strict';

var fs     = require('fs-extra');
var chalk  = require('chalk');
var path   = require('path');
var ui     = require('../ui');

module.exports = function(config) {
  var projectPath = config.get('projectPath');
  var templatesPath = path.join(__dirname, '../..', 'templates');

  return function copyHooks(callback) {
    var cdvHooksPath      = path.join(projectPath, 'hooks');
    var templateHooksPath = path.join(templatesPath, 'hooks');

    ui.write('\n');
    ui.pleasantProgress.start('Copying default cordova hooks to cordova project');

    fs.copy(templateHooksPath, cdvHooksPath, function(err) {
      if(err) callback(err);
      ui.write(chalk.green('done'));
      callback(null);
    });

  };
};
