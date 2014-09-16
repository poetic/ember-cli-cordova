'use strict';

var path      = require('path');
var commands  = require('./lib/commands');
var postBuild = require('./lib/tasks/post-build');

module.exports = {
  name: 'ember-cli-cordova',
  init: function() {
    this.setConfig();
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  includedCommands: function() {
    return commands;
  },

  setConfig: function(){
    var env = this.project.config('development');
    if(!this.config) {
      this.config = {};
    }

    if (env.cordova) {
      this.config = env.cordova;
    }
  },

  postBuild: function() {
    return postBuild(this.project, this.config)();
  }
};
