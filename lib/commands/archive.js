'use strict';

var path    = require('path');
var chalk   = require('chalk');
var Command = require('../models/command');
var Project = require('../models/project');

module.exports = Command.extend({
  name: 'archive',
  description: 'Build project and create xcode archive',
  commandSuffix: '<version> <options...>',
  optionsHelp: [
    '--environment|-e  (Default: staging)'
  ],
  parseArgs: function() {
    this.args.version = this.rawArgs[1];
  },
  validateArgs: function() {
    return this.args.version ? true : false;
  },
  parseOptions: function() {
    this.options.env   = this.options.environment || this.options.e || 'staging'
  },
  run: function() {
    var project = Project.closest();
    require('../tasks/archive')(this.args.version, this.options.env, project)();
  }
});
