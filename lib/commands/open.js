'use strict';

var path            = require('path');
var defaultPlatform = require('../utils/default-platform');

module.exports = {
  name: 'cordova:open',
  aliases: ['cdv:open'],
  description: 'Open the native platform project with the default or specified application',
  works: 'insideProject',

  availableOptions: [
    { name: 'platform', type: String },
    { name: 'application', type: String}
  ],

  run: function(options) {
    var platform = options.platform || defaultPlatform(this.project);
    return require('../tasks/open')(this.project, platform, options.application)();
  }
};
