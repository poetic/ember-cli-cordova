'use strict';

var path       = require('path');
var runCommand = require('../utils/run-command');

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
