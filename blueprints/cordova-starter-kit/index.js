var path        = require('path');
var chalk       = require('chalk');
var Promise     = require('../../lib/ext/promise');
var stringUtils = require('../../lib/utils/string');
var runCommand  = require('../../lib/utils/run-command');

module.exports = {
  // Allows the generator to not require an entity name
  normalizeEntityName: function(entityName) {
    return entityName;
  },

  locals: function(options) {
    var name = options.project.pkg.name;

    return {
      namespace:     stringUtils.classify(name),
      modulePrefix:  stringUtils.dasherize(name)
    }
  },

  addPluginToProject: function(name) {
    var ui = this.ui;

    return runCommand('cordova plugin add ' + name, null, {
      cwd: path.join(this.project.root, 'cordova')
    })().then(function() {
      if (ui) {
        ui.writeLine('  ' + chalk.green('install plugin') + ' ' + name);
      }
    });
  },

  afterInstall: function() {
    return Promise.all([
      this.addPackageToProject('broccoli-sass'),
      this.addPackageToProject('liquid-fire'),
      this.addPackageToProject('ember-gestures')
    ]);
  }
};
