'use strict';

var path    = require('path');

// Match the outer tags so we can match and reinsert them with a String#replace
var idRegex        = /(id=\")[\w\.]+(\")/;
var nameRegex      = /(<name>)\w+(<\/name>)/;
var endWidgetRegex = /(.*)(<\/widget>)/;

var preferences = [
  // haha, 4 spaces at the beginning
  '    <preference name="DisallowOverscroll" value="true" />'
];

module.exports = function(project) {
  var config = project.cdvConfig;
  var message = 'Update config.xml with your project settings';
  var cordovaPath = path.join(project.root, 'cordova');

  return require('./modify-xml')(message, cordovaPath, function(xml) {
    xml = this.xmlReplace(idRegex, config.get('id'), xml);
    xml = this.xmlReplace(nameRegex, config.get('name'), xml);

    // add preference tag(s)
    xml = this.xmlReplace(endWidgetRegex, preferences.join('\n') + '\n', xml);

    return xml;
  });
};

