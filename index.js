'use strict';

function EmberCLICordova(project) {
  this.project = project;
  this.name    = 'Ember CLI Cordova';
}

EmberCLICordova.prototype.includedCommands = function() {
  return {};
}

module.exports = EmberCLICordova;
