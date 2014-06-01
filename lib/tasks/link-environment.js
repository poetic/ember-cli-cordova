'use strict';

var Promise = require('../ext/promise');
var fs      = require('fs-extra');
var symlink = Promise.denodeify(fs.symlink);
var remove  = Promise.denodeify(fs.remove);
var path    = require('path');
var chalk   = require('chalk');
var ui      = require('../ui');

module.exports = function(project, emberOutputPath){
  if(!project) {
    throw new Error('A project must be passed into this function');
  }

  var emberPath  = path.join(project.get('root'), emberOutputPath);
  var wwwPath    = path.join(project.get('root'), 'www');

  return function() {
    ui.write('\n');
    ui.pleasantProgress.start('Symlinking ember dir to cordova www');

    return remove(wwwPath).then(symlink.bind(this, emberPath, wwwPath, 'dir')).then(function() {
      ui.write(chalk.green('done'));
    });
  };
};

