'use strict';

var commands = require('./lib/commands');

function EmberCLICordova(project) {
  this.project = project;
  this.name    = 'Ember CLI Cordova';
}

EmberCLICordova.prototype.includedCommands = function() {
  return commands;
}

EmberCLICordova.prototype.included = function() { }
EmberCLICordova.prototype.treeFor = function() { }

module.exports = EmberCLICordova;
