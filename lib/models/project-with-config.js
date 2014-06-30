// https://github.com/stefanpenner/ember-cli/blob/master/lib/models/project.js
'use strict';

var findup = require('findup-sync');
var chalk  = require('chalk');
var path   = require('path');
var Config = require('../utils/config');

module.exports = function(project) {
  var configPath = findup('.ember-cdv', { cwd: project.root || process.cwd(), nocase: true });

  if(configPath) {
    project.cdvConfig = new Config(configPath);
    return project;
  } else {
    throw new ProjectNotFoundError('you must be inside of a ember-cdv project');
  }
};

function ProjectNotFoundError(message) {
  this.name = 'ProjectNotFoundError';
  this.message = message;
  this.stack = (new Error()).stack;
};

ProjectNotFoundError.constructor = ProjectNotFoundError;
ProjectNotFoundError.prototype = new Error();
