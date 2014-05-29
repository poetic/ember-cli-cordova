'use strict';

var Promise = require('../ext/promise');
var fs      = require('fs-extra');
var copy    = Promise.denodeify(fs.copy);
var chalk   = require('chalk');
var path    = require('path');
var ui      = require('../ui');

module.exports = function(config) {
  var projectPath   = config.get('projectPath');
  var templatesPath = path.join(__dirname, '../..', 'templates');

  return function() {
    var destination = path.join(projectPath, 'ember');
    var source      = path.join(templatesPath, 'ember');

    ui.write('\n');
    ui.pleasantProgress.start('Copying custom ember files to new ember-cli project');

    if(fs.existsSync(source)) {
      return copy(source, destination).then(function(err) {
        ui.write(chalk.green('done'));
      });
    } else {
      //  TODO: should I be rejecting this? seems bad if I can'tt find the
      //  templates
      ui.write(chalk.green('done'));
      return Promise.resolve();
    }
  };
};
