'use strict';

var cordova = require('./cordova');
var path       = require('path');

module.exports = function(project) {
  var config = project.cordovaConfig;

  var args = ['create', 'cordova', config.id, config.name];

  return cordova(args, project);
};
