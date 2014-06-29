'use strict';

var path = require('path');

var versionRegex = /(version=\")[\d.]+(\")/;

module.exports = function(version, project) {
  var message     = 'Update config.xml with version ' + version;
  var cordovaPath = path.join(project.root, 'cordova');

  return require('./modify-xml')(message, cordovaPath, function(xml) {
    return this.xmlReplace(versionRegex, version, xml);
  });

};
