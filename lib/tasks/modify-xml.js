'use strict';

var fs      = require('fs');
var chalk   = require('chalk');
var path    = require('path');
var ui      = require('../ui');
var Promise = require('../ext/promise');

// Used as the context of this for the replaceFn so it can be used
var replaceObject = {
  xmlReplace: function(regex, value, xml) {
    return xml.replace(regex, '$1' + value + '$2');
  }
};

module.exports = function(message, root, replaceFn) {
  return function modifyXml() {
    return new Promise(function(resolve, reject){
      try {
        var configPath = path.join(root, 'config.xml');

        ui.start(chalk.green(message));

        var xml = fs.readFileSync(configPath, { encoding: 'utf8' });

        xml = replaceFn.call(replaceObject, xml);

        fs.writeFileSync(configPath, xml);
        resolve();

      } catch(e) {
        reject(e);
      }
    });
  };
};
