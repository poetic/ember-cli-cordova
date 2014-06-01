'use strict';

var path    = require('path');
var chalk   = require('chalk');
var Command = require('../models/command');
var Project = require('../models/project');
var ui      = require('../ui');
var chalk   = require('chalk');

module.exports = Command.extend({
  name: 'archive',
  description: 'Build project and create xcode archive. If the tag or commit options are present they will be performed after archiving.',
  commandSuffix: '<version> <options...>',
  optionsHelp: [
    '--environment|-e  (Default: staging)',
    '--tag|-t',
    '--commit|-c'
  ],
  parseArgs: function() {
    this.args.version = this.rawArgs[1];
  },
  validateArgs: function() {
    return this.args.version ? true : false;
  },
  parseOptions: function() {
    this.options.env    = this.options.environment || this.options.e || 'staging'
    this.options.tag    = this.options.hasOwnProperty('tag') || this.options.hasOwnProperty('t') || false;
    this.options.commit = this.options.hasOwnProperty('commit') || this.options.hasOwnProperty('c') || false;
  },
  run: function() {
    var project = Project.closest();

    require('../tasks/archive')(this.args, this.options, project)().catch(function(err){
      ui.write(chalk.red('\nError thrown while archiving project\n\n'));
      ui.write(err);
    });
  }
});
