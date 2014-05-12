var linkEnv = require('../tasks/link-environment');
var chalk   = require('chalk');
var Command = require('../models/command');
var Project = require('../models/project');

var LinkProductionCommand = Command.extend({
  name: 'link-production',
  description: 'Symlink ember/dist to www for production builds',
  run: function() {
    return linkEnv(Project.closest(), 'ember/dist');
  }
});

module.exports = function(options) {
  return new LinkProductionCommand(options);
}

