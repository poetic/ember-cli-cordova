'use strict';

var path       = require('path');
var runCommand = require('../utils/run-command');

module.exports = function(rawArgs, project) {

  var joinedArgs = rawArgs.join(' ');
  var cdvCommand = 'cordova ' + joinedArgs;

  var msg = "Running 'cordova " + joinedArgs + "'";

  return function(){
    return runCommand(cdvCommand, msg, {
      cwd: path.join(project.root, 'cordova')
    })();
  };
};
