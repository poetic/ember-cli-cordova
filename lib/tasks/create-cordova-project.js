'use strict';

var cordova = require('./cordova');

module.exports = function(project) {
  var config = project.cordovaConfig;

  var args = ['create', 'cordova', config.id, config.name];

  return cordova(args, project);
};
