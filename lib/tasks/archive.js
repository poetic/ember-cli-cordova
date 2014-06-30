'use strict';

var path       = require('path');
var runCommand = require('../utils/run-command');

module.exports = function(version, options, project) {
  var config    = project.cdvConfig;
  var updateXml = require('./update-config-xml-version')(version, project);

  var build   = require('./build')(options.environment, 'ios', project);

  var iosPath        = path.join(project.root, 'cordova', 'platforms/ios');
  var archiveCommand = 'xcodebuild -scheme ' + config.get('name') + ' archive';
  var archiveProject = runCommand(archiveCommand, 'Archiving project with xcodebuild', {
    cwd: iosPath
  });

  var commitCommand = 'git add . && git commit -m "archive version: '
                      + version + '"';
  var commitProject = runCommand(commitCommand, 'Commiting changes', {
    cwd: project.root
  });

  var tagCommand = ' && git tag -a -m "' + 'Version ' + version
                      + '" ' + version;
  var tagProject = runCommand(tagCommand, 'Tagging with version ' + version, {
    cwd: project.root
  });

  return function() {
    var promises = updateXml().then(build).then(archiveProject);

    // TODO: this is a little messy. Not sure why I wasn't able to just do the
    // else. When I did 2.thens it did them in parallel instead of in order
    if(options.commit && options.tag) {
      promises.then(commitProject).then(tagProject);
    } else {
      if(options.commit) {
        promises.then(commitProject)
      } else if(options.tag) {
        promises.then(tagProject);
      }
    }

    return promises;
  }
};
