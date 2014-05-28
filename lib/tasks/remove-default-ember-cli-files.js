'use strict';

var exec  = require('child_process').exec;
var path  = require('path');
var chalk = require('chalk');
var fs    = require('fs-extra');
var ui    = require('../ui');

var defaultEmberCliFiles = [
  'app/styles/app.css',
  'app/routes/index.js',
  'app/router.js',
  //'app/app.js',
  'config/environment.js'
];

module.exports = function(config){
  var emberPath   = path.join(config.get('projectPath'), 'ember');

  return function(callback) {
    ui.write('\n');
    ui.pleasantProgress.start('Removing default ember-cli files');

    try {
      defaultEmberCliFiles.forEach(function(filePath){
        fs.removeSync(path.join(emberPath, filePath));
      });

      ui.write(chalk.green('done'));
      callback(null);
    }
    catch(e) {
      callback(e);
    }
  };
};

