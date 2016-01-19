'use strict';

var path            = require('path');
var chalk           = require('chalk');
var defaultPlatform = require('../utils/default-platform');

module.exports = {
  name: 'cordova:build',
  aliases: ['cdv:build'],
  description: 'Build the ember and cordova project together running in the simulator or on a device',
  works: 'insideProject',

  availableOptions: [
    { name: 'environment', type: String, default: 'development' },
    { name: 'platform', type: String }
  ],

  run: function(options) {
    var platform = options.platform || defaultPlatform(this.project);
    return require('../tasks/build')(options.environment, platform, this.project)();
  }
};
