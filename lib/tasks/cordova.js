'use strict';

var path     = require('path');
var Promise  = require('../ext/promise');
var runCommand  = require('../utils/run-command');
var spawn    = require('child_process').spawn;
var chalk    = require('chalk');
var ui       = require('../ui');
var defaults = require('lodash').defaults;

module.exports = function(rawArgs, project) {

  var cdvPath    = path.join(__dirname, '..', '..', 'node_modules', 'cordova', 'bin', 'cordova');
  var joinedArgs = rawArgs.join(' ');
  var cdvCommand = cdvPath + ' ' + joinedArgs;

  var msg = "Running 'cordova " + joinedArgs + "'";

  return function(){
    return runCommand(cdvCommand, msg, {
      cwd: path.join(project.root, 'cordova')
    }, { stdout: true, doneMsg: false })();
  };
};
