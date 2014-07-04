'use strict';

var path    = require('path');

module.exports = {
  name: 'cordova:open',
  aliases: ['cdv:open'],
  description: 'open the ios project with the default application',
  works: 'insideProject',

  run: function() {
    return require('../tasks/open')(this.project)();
  }
};
