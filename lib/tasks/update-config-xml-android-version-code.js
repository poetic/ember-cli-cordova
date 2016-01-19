'use strict';

var fs      = require('fs');
var path    = require('path');
var Promise = require('../ext/promise');

var versionCodeRegex = /(android-versionCode=\")[\d.]+(\")/;
var versionCodeMatch = /android-versionCode=\"([\d.])+\"/;

module.exports = function(project) {
  return new Promise(function(resolve, reject){
    try {
      var cordovaPath = path.join(project.root, 'cordova');
      var configPath = path.join(cordovaPath, 'config.xml');
      var xml = fs.readFileSync(configPath, { encoding: 'utf8' });

      var match = xml.match(versionCodeMatch);
      if(match) {
        var versionCode = (parseInt(match[1], 10)) + 1;
        var message     = 'Update config.xml with android-versionCode ' + versionCode;

        return require('./modify-xml')(message, cordovaPath, function(xml) {
          return this.xmlReplace(versionCodeRegex, versionCode, xml);
        })().then(resolve, reject);
      } else {
        reject();
      }
    } catch (e) {
      reject(e);
    }
  });
};
