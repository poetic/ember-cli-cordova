'use strict';

var path    = require('path');
var chalk   = require('chalk');

module.exports = {
  name: 'cordova:build',
  aliases: ['cdv:build'],
  description: 'Build the ember and cordova project together running in the simulator or on a device',
  works: 'insideProject',

  availableOptions: [
    { name: 'environment', type: String, default: 'development' },
    { name: 'platform', type: String, default: 'ios' }
  ],

  run: function(options) {
    return require('../tasks/build')(options.environment, options.platform, this.project)();
  }
};
