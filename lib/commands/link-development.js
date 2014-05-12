var linkEnv = require('../tasks/link-environment');
var chalk   = require('chalk');
var Command = require('../models/command');
var Project = require('../models/project');

var LinkDevelopmentCommand = Command.extend({
  name: 'link-development',
  description: 'Symlink ember/tmp/output to www for updating with live reload',
  run: function() {
    return linkEnv(Project.closest(), 'ember/tmp/output');
  }
});

module.exports = function(options) {
  return new LinkDevelopmentCommand(options);
}

