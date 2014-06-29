'use strict';

var path    = require('path');
var chalk   = require('chalk');

module.exports = {
  name: 'cdv:build',
  description: 'Build the ember and cordova project together running in the simulator or on a device',

  availableOptions: [
    { name: 'environment', type: String, default: 'development' },
    { name: 'platform', type: String, default: 'ios' }
  ],

  run: function(options) {
    return require('../tasks/build')(options.environment, options.platform, this.project)();
  }
};
