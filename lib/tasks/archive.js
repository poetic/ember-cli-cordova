'use strict';

var path       = require('path');
var runCommand = require('../utils/run-command');

module.exports = function(version, env, project) {

  var updateXml = require('./update-config-xml-version')(version, project);

  var build   = require('./build')(env, 'ios');

  var iosPath = path.join(project.root, 'platforms/ios');
  var command = 'cd ' + iosPath + ' && xcodebuild -scheme ' + project.name + ' archive';

  var archiveProject = runCommand(command, 'Archiving project with xcodebuild');

  return function() {
    return updateXml().then(build).then(archiveProject);
  }
};
