'use strict';

var Promise = require('../ext/promise');
var fs      = require('fs-extra');
var copy    = Promise.denodeify(fs.copy);
var chalk   = require('chalk');
var path    = require('path');
var ui      = require('../ui');

module.exports      = function(project) {
  var root   = path.join(project.root, 'cordova');
  var templatesPath = path.join(__dirname, '../..', 'templates', 'cordova');

  var cdvHooksPath      = path.join(root, 'hooks');
  var templateHooksPath = path.join(templatesPath, 'hooks');

  return function() {
    ui.write('\n');
    ui.pleasantProgress.start('Copying default cordova hooks to cordova project');

    return copy(templateHooksPath, cdvHooksPath).then(function(err) {
      ui.write(chalk.green('done'));
    });
  };

};
