'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');
var linkEnv    = require('../tasks/link-environment');

module.exports = function(env, platform, project) {

  var cdvPath = path.join(__dirname, '..', '..', 'node_modules', 'cordova', 'bin', 'cordova');
  var cdvCommand     = cdvPath + ' build ' + platform;

  var emberCommand = 'ember build --environment ' + env;

  var emberMsg   = 'Building ember project for environment ' + env;
  var emberBuild = runCommand(emberCommand, emberMsg, {
    cwd: project.root
  });

  var cdvMsg   = 'Building cordova project for platform ' + platform;
  var cdvBuild = runCommand(cdvCommand, cdvMsg, {
    cwd: path.join(project.root, 'cordova')
  });

  return function(){
    return linkEnv(project)().then(emberBuild).then(cdvBuild);
  };
};
