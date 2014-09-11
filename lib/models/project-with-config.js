'use strict';

var stringUtils = require('../utils/string');

var getComId = function(project) {

  var fs   = require('fs');
  var path = require('path');

  var configPath = path.join(project.root, 'cordova', 'config.xml');
  var configFile = fs.readFileSync(configPath, { encoding: 'utf-8'});

  var idRegex = /id=\"([\w\-\.]+)\"/;
  var matches = configFile.match(idRegex);

  if(matches.length) {
    return matches[1];
  }

  throw new Error('Unable to find an id within your cordova/config.xml');
}

module.exports = function(project, id) {
  project.cordovaConfig = {
    name:  stringUtils.classify(project.name()),
    id:    id || getComId(project)
  };

  return project;
};
