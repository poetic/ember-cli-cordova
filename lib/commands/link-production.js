var linkEnv = require('../tasks/link-environment');
var chalk   = require('chalk');
var Command = require('../models/command');
var extend  = require('lodash').extend;

var LinkProductionCommand = Command;

extend(LinkProductionCommand.prototype, {
  name: 'link-production',
  validateArguments: function() {
    this.args.projectPath = this.options.projectPath;

    return true;
  },
  run: function() {
    if(typeof this.args.projectPath === 'string') {
      return linkEnv('ember/dist', projectPath);
    }
    linkEnv('ember/dist');
  }
});

module.exports = function(options) {
  return new LinkProductionCommand(options);
}

