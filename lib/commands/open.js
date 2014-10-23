'use strict';

var path    = require('path');

module.exports = {
  name: 'cordova:open',
  aliases: ['cdv:open'],
  description: 'Open the native project with the default application',
  works: 'insideProject',

  availableOptions: [
    { name: 'platform', type: String, default: 'ios' },
    { name: 'application', type: String}
  ],

  run: function(options) {
    return require('../tasks/open')(this.project, options.platform, options.application)();
  }
};
