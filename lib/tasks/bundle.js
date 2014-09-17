'use strict';

var runCommand = require('../utils/run-command');
var Promise    = require('../ext/promise');
var path       = require('path');
var linkEnv    = require('../tasks/link-environment');
var ui         = require('../ui');
var chalk      = require('chalk');
var archiver   = require('archiver');
var fs         = require('fs');

module.exports = function(env, project) {
  var emberCommand = 'ember build --environment ' + env;

  var emberMsg   = 'Building ember project for environment ' + env;
  var emberBuild = runCommand(emberCommand, emberMsg, {
    cwd: project.root
  });

  var doZip = function() {
    var zipMsg   = 'Zipping dist folder into public/bundle.zip';
    ui.start(chalk.green(zipMsg));

    return new Promise(function(resolve, reject) {
      var output = fs.createWriteStream(path.join(project.root, 'public', 'bundle.zip'));
      var archive = archiver('zip');
      output.on('close', resolve);
      archive.on('error', reject);
      archive.pipe(output);
      archive.bulk([
        { expand: true, cwd: path.join(project.root, 'dist'), src: ['**/*'] }
      ]).finalize();
    });
  }


  return function(){
    return linkEnv(project)().then(emberBuild).then(doZip);
  };
};
