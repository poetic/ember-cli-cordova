'use strict';

var path       = require('path');
var runCommand = require('../utils/run-command');
var Promise    = require('../ext/promise');
var defaultPlatform = require('../utils/default-platform');

module.exports = function(version, options, project, platform) {
  var config    = project.cordovaConfig;
  var updateXml = function() { return Promise.resolve(); };
  var archiveProject = function() { return Promise.resolve(); };

  platform  = platform || 'ios';

  if (version) {
    updateXml = require('./update-config-xml-version')(version, project);
  }

  var build   = require('./build')(options.environment, platform, project);

  if(platform === 'ios') {
    var iosPath        = path.join(project.root, 'cordova', 'platforms/ios');
    var archiveCommand = 'xcodebuild -scheme ' + config.name + ' archive';
    var archiveMessage = 'Archiving project with xcodebuild';
    archiveProject = runCommand(archiveCommand, archiveMessage, {
      cwd: iosPath
    });
  }

  if(platform === 'android' && version) {
    var __updateXml = updateXml;

    updateXml = function () {
      var androidVersionCode = require('./update-config-xml-android-version-code')(project);
      return __updateXml().then(androidVersionCode);
    }
  }

  var commitCommand = 'git add . && git commit -m "archive version: '
                      + version + '"';
  var commitProject = runCommand(commitCommand, 'Commiting changes', {
    cwd: project.root
  });

  var tagCommand = 'git tag -a -m "' + 'Version ' + version + '" ' + version;
  var tagProject = runCommand(tagCommand, 'Tagging with version ' + version, {
    cwd: project.root
  });

  return function() {
    var promises = updateXml().then(build).then(archiveProject);

    if (options.commit && options.tag) {
      promises.then(commitProject).then(tagProject);
    } else {
      if (options.commit) {
        promises.then(commitProject)
      } else if (options.tag) {
        promises.then(tagProject);
      }
    }

    return promises;
  }
};
