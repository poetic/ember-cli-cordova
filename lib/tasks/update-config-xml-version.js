'use strict';

var fs      = require('fs');
var chalk   = require('chalk');
var path    = require('path');
var ui      = require('../ui');
var Promise = require('../ext/promise');

var versionRegex = /(version=\")[\d.]+(\")/;

module.exports = function(version, project) {
  var message = 'Update config.xml with version ' + version;

  return require('./modify-xml')(message, project.get('root'), function(xml) {
    return this.xmlReplace(versionRegex, version, xml);
  });

};
