var linkEnv = require('../tasks/link-environment');
var chalk   = require('chalk');
var Command = require('../models/command');
var extend  = require('lodash').extend;

var LinkDevelopmentCommand = Command;

extend(LinkDevelopmentCommand.prototype, {
  name: 'link-development',
  validateArguments: function() {
    return true;
  },
  run: function() {
    linkEnv('ember/tmp/output');
  }
});

module.exports = function() {
  return new LinkDevelopmentCommand({});
}

