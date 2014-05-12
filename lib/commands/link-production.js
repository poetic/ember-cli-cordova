var linkEnv = require('../tasks/link-environment');
var chalk   = require('chalk');
var Command = require('../models/command');
var Project = require('../models/project');

var LinkProductionCommand = Command.extend({
  name: 'link-production',
  run: function() {
    return linkEnv(Project.closest(), 'ember/dist');
  }
});

module.exports = function(options) {
  return new LinkProductionCommand(options);
}

