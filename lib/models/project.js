// https://github.com/stefanpenner/ember-cli/blob/master/lib/models/project.js
'use strict';

var findup = require('findup-sync');
var chalk  = require('chalk');
var Config = require('../utils/config');
var path   = require('path');

function Project(root, config) {
  this.root   = root;
  this.config = config;
};

Project.prototype.get = function(key) {
  if(this[key]) {
    return this[key];
  }
  return this.config.get(key);
}

module.exports = Project;

function ProjectNotFoundError(message) {
  this.name = 'ProjectNotFoundError';
  this.message = message;
  this.stack = (new Error()).stack;
};

ProjectNotFoundError.constructor = ProjectNotFoundError;
ProjectNotFoundError.prototype = new Error();

Project.prototype.toString = function() {
  return '[Project ' + this.config.get('name') + ']';
};

Project.closest = function(pathName) {
  var configPath = findup('.ember-cdv', { cwd: pathName || process.cwd(), nocase: true });

  if(configPath) {
    var config = new Config(configPath);
    return new Project(path.dirname(configPath), config);
  } else {
    throw new ProjectNotFoundError('you must be inside of a ember-cdv project');
  }
};

