'use strict';

var runCommand = require('../utils/run-command');
var path       = require('path');
var fs         = require('fs');
var Promise    = require('../ext/promise');

module.exports = function(project) {
  return function() {
    var distPath = path.join(project.root, 'dist');

    if(fs.existsSync(distPath)) {
      return Promise.resolve();
    } else {
      return runCommand('ember build', 'Building ember app since dist/ dir doesn\'t exist yet', {
        cwd: project.root
      })();
    }

  }
};
