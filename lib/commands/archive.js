'use strict';

var path              = require('path');
var projectWithConfig = require('../models/project-with-config');

module.exports = {
  name: 'cordova:archive',
  aliases: ['cdv:archive'],
  description: 'Build project and create xcode archive. If the tag or commit options are present they will be performed after archiving.',
  works: 'insideProject',

  anonymousOptions: [
    '<version>'
  ],

  availableOptions: [
    { name: 'environment', type: String, default: 'staging' },
    { name: 'tag', type: Boolean, default: false },
    { name: 'commit', type: Boolean, default: false }
  ],

  run: function(options, rawArgs) {
    projectWithConfig(this.project);
    var version = rawArgs[0];

    return require('../tasks/archive')(version, options, this.project)();
  }
};
