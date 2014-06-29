'use strict';

var path = require('path');
var fs      = require('fs');
var chalk   = require('chalk');
var path    = require('path');
var ui      = require('../ui');
var Promise = require('../ext/promise');

var vendorRegex = /(<script src="assets\/vendor.js"><\/script>)/
var script = '<script src="cordova.js"></script>';

module.exports = function(project) {
  var message     = 'Update index.html with cordova.js '

  return function() {
    return new Promise(function(resolve, reject){
      try {
        var indexPath = path.join(project.root, 'app', 'index.html');

        ui.write('\n');
        ui.pleasantProgress.start(message);

        var file = fs.readFileSync(indexPath, { encoding: 'utf8' });

        file = file.replace(vendorRegex, script + '\n    $1');

        fs.writeFileSync(indexPath, file);
        ui.write(chalk.green('done'));
        resolve();

      } catch(e) {
        reject(e);
      }
    });
  }

};
