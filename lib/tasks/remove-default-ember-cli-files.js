'use strict';

var exec    = require('child_process').exec;
var path    = require('path');
var chalk   = require('chalk');
var RSVP    = require('rsvp');
var Promise = require('../ext/promise');
var fs      = require('fs-extra');
var remove  = Promise.denodeify(fs.remove);
var ui      = require('../ui');

var defaultEmberCliFiles = [
  'app/styles/app.css',
  'app/routes/index.js',
  'app/router.js',
  //'app/app.js',
  'config/environment.js'
];

module.exports = function(config){
  var emberPath   = path.join(config.get('root'), 'ember');

  return function() {
    ui.write('\n');
    ui.pleasantProgress.start('Removing default ember-cli files');

    var promises = defaultEmberCliFiles.map(function(filePath){
      remove(path.join(emberPath, filePath));
    });

    return RSVP.all(promises).then(function() {
      ui.write(chalk.green('done'));
    });
  };
};

