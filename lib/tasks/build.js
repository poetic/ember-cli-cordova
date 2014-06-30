'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');
var linkEnv    = require('../tasks/link-environment');

module.exports = function(env, platform, project) {

  var command = 'cordova build ' + platform;

  var msg = 'Building cordova project for platform ' + platform
              + ' with environment ' + env;

  var build = runCommand(command, msg, {
    cwd: path.join(project.root, 'cordova')
  });

  return function(){
    return linkEnv(project)().then(build);
  };
};
