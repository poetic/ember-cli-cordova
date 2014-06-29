'use strict';

var path    = require('path');
var chalk   = require('chalk');
var Project = require('../models/project');
var ui      = require('../ui');
var chalk   = require('chalk');

module.exports = {
  name: 'archive',
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

  run: function() {
    var project = Project.closest();

    require('../tasks/archive')(this.args, this.options, project)().catch(function(err){
      ui.write(chalk.red('\nError thrown while archiving project\n\n'));
      ui.write(err);
    });
  }
};
