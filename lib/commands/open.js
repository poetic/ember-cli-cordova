'use strict';

var async   = require('async');
var path    = require('path');
var chalk   = require('chalk');
var fs      = require('fs');
var Config  = require('../utils/config');
var Command = require('../models/command');
var Project = require('../models/project');

module.exports = Command.extend({
  name: 'open',
  description: 'open the ios project with the default application',
  //commandSuffix: '<options...>',
  // Disabled for now until we support other platforms
  // https://github.com/poetic/ember-cordova-cli/issues/14
  //optionsHelp: [
    //'--platform|-p ios|android (Default: ios)'
  //],
  parseOptions: function() {
    this.options.platform = this.options.platform || this.options.p || 'ios';
  },
  validateOptions: function() {
    if(this.options.platform === 'ios') {
      return true;
    }
  },
  run: function() {
    var project = Project.closest();
    require('../tasks/open')(this.options.platform, project)();
  }
});
