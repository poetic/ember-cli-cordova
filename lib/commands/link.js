var linkEnv = require('../tasks/link-environment');
var Command = require('../models/command');
var Project = require('../models/project');

module.exports = Command.extend({
  name: 'link',
  description: 'Symlink ember/dist to www. Needed after cloning a project.',
  run: function() {
    return linkEnv(Project.closest(), 'ember/dist')();
  }
});
