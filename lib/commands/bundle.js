'use strict';

module.exports = {
  name: 'cordova:bundle',
  aliases: ['cdv:bundle'],
  description: 'Bundle the dist folder into a zip that the app can download and use',
  works: 'insideProject',

  availableOptions: [
    { name: 'environment', type: String, default: 'staging' }
  ],

  run: function(options) {
    return require('../tasks/bundle')(options.environment, this.project)();
  }
};
