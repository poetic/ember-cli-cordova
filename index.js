'use strict';

function EmberCLICordova(project) {
  this.project = project;
  this.name    = 'Ember CLI Cordova';
}

EmberCLICordova.prototype.includedCommands = function() {
  return {
    'cdv:init': require('./lib/commands/init')
  };
}

EmberCLICordova.prototype.included = function() { }
EmberCLICordova.prototype.treeFor = function() { }

module.exports = EmberCLICordova;
