'use strict';

var path       = require('path');
var runCommand = require('../utils/run-command');

module.exports = function(args, options, project) {
  var updateXml = require('./update-config-xml-version')(args.version, project);

  var build   = require('./build')(options.env, 'ios');

  var iosPath        = path.join(project.root, 'platforms/ios');
  var archiveCommand = 'cd ' + iosPath
                        + ' && xcodebuild -scheme ' + project.name + ' archive';
  var archiveProject = runCommand(archiveCommand, 'Archiving project with xcodebuild');

  var commitCommand = 'cd ' + project.root
                      + '&& git add . && git commit -m "archive version: '
                      + args.version + '"';
  var commitProject = runCommand(commitCommand, 'Commiting changes');

  var tagCommand = 'cd ' + project.root
                    + ' && git tag -a -m "' + 'Version ' + args.version
                    + '" ' + args.version;
  var tagProject = runCommand(tagCommand, 'Tagging with version ' + args.version);

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
