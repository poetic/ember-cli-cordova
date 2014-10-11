'use strict';

var path      = require('path');
var commands  = require('./lib/commands');
var postBuild = require('./lib/tasks/post-build');

module.exports = {
  name: 'ember-cli-cordova',

  treePaths: {
    app:               'app',
    styles:            'app/styles',
    templates:         'app/templates',
    addon:             'addon',
    'addon-styles':    'addon/styles',
    'addon-templates': 'addon/templates',
    vendor:            'vendor',
    'test-support':    'test-support',
    'public':          'public'
  },

  contentFor: function(type) {
    if(type === 'body') {
      return '<script src="cordova.js"></script>';
    }
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  includedCommands: function() {
    return commands;
  },

  cdvConfig: function() {
    var config = this.project.config('development');
    if (config.cordova) {
      return config.cordova
    }

    return {};
  },

  postBuild: function() {
    return postBuild(this.project, this.cdvConfig())();
  }
};
