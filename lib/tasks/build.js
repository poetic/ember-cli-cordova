'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');
var linkEnv    = require('../tasks/link-environment');
var Project    = require('../models/project');

module.exports = function(env, platform) {

  var command = 'cordova build ' + platform;

  var msg = 'Building cordova project for platform ' + platform
              + ' with environment ' + env;

  if(env === 'production') {
    linkEnv(Project.closest(), 'ember/dist');
  } else {
    linkEnv(Project.closest(), 'ember/tmp/output');
  }

  return runCommand(command, msg);
};
