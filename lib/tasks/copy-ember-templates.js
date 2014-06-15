'use strict';

var Promise    = require('../ext/promise');
var template   = require('lodash').template;
var fs         = require('fs-extra');
var copy       = Promise.denodeify(fs.copy);
var readdir    = Promise.denodeify(require('recursive-readdir'));
var outputFile = Promise.denodeify(fs.outputFile);
var readFile   = Promise.denodeify(fs.readFile);
var chalk      = require('chalk');
var path       = require('path');
var ui         = require('../ui');

// Used to determine which file types to run through lodash template
var fileTypeWhitelist = ['.hbs', '.js', '.coffee', '.css', '.scss', '.less'];

function shouldParseFile(inputFile) {
  return fileTypeWhitelist.indexOf(path.extname(inputFile)) > -1;
}

module.exports = function(config) {
  var root   = config.get('root');
  var templatesPath = path.join(__dirname, '../..', 'templates');

  var context = {
    name:          config.get('name'),
    namespace:     config.get('name'),
    modulePrefix:  config.get('modulePrefix')
  };

  return function() {
    var destination = path.join(root, 'ember');
    var source      = path.join(templatesPath, 'ember');

    ui.write('\n');
    ui.pleasantProgress.start('Copying custom ember files to new ember-cli project');

    if(fs.existsSync(source)) {
      return new Promise(function(resolve, reject){

        var parseFiles = function(files) {
          var promises = files.map(function(inputFile){
            var destFile = path.join(destination, inputFile.replace(source, ''));

            if(shouldParseFile(inputFile)) {
              return readFile(inputFile).then(function(content) {
                return outputFile(destFile, template(content, context));
              });
            }

            return copy(inputFile, destFile);
          });

          Promise.all(promises).then(function(result) {
            ui.write(chalk.green('done'));
            resolve(result);
          }, reject);
        };

        readdir(source).then(parseFiles, reject);
      });

    } else {
      //  TODO: should I be rejecting this? seems bad if I can'tt find the
      //  templates
      ui.write(chalk.green('done'));
      return Promise.resolve();
    }
  };
};
