'use strict';

var path    = require('path');
var chalk   = require('chalk');
var Command = require('../models/command');
var Project = require('../models/project');

module.exports = Command.extend({
  name: 'build',
  description: 'Build the ember and cordova project together running in the simulator or on a device',
  commandSuffix: '<options...>',
  optionsHelp: [
    '--environment|-e  (Default: development)',
    '--platform|-p  (Default: ios)'
  ],
  parseOptions: function() {
    this.options.env   = this.options.environment || this.options.e || 'development'
    this.options.platform = this.options.platform || this.options.p || 'ios';
  },
  run: function() {
    var project = Project.closest();
    require('../tasks/build')(this.options.env, this.options.platform, project)();
  }
});
