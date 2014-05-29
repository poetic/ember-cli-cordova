'use strict';

var path        = require('path');
var chalk       = require('chalk');
var Config      = require('../utils/config');
var Command     = require('../models/command');
var Project     = require('../models/project');
var linkEnv     = require('../tasks/link-environment');
var stringUtils = require('../utils/string');
var ui          = require('../ui');
var Promise     = require('../ext/promise');

module.exports = Command.extend({
  name: 'new',
  description: 'Creates a cordova project with an ember-cli project inside with preinstalled dependencies and files for easy app development ',
  commandSuffix: '<app-name> <reverse.style.domain> <options...>',
  optionsHelp: [
    '--directory|-d  (Default: project name)'
  ],
  parseArgs: function() {
    this.args.name = this.rawArgs[1];
    this.args.id   = this.rawArgs[2];
  },
  validateArgs: function() {
    if(this.args.name && this.args.id) {
      return true;
    }
  },
  parseOptions: function() {
    this.options.dirName = this.options.directory || this.options.d || this.args.name;
    this.options.dirName = stringUtils.dasherize(this.options.dirName);
  },
  run: function() {
    var projectPath = path.join(process.cwd(), this.options.dirName);
    var configPath  = path.join(projectPath, '.ember-cdv');

    this.config = new Config(configPath, {
      projectPath:  path.join(process.cwd(), this.options.dirName),
      name:         this.args.name,
      id:           this.args.id
    });

    this.setupCordova()//.then(
      //.then(this.setupEmber)
      //.then(this.finalizeSetup)
      .then(function() {
        ui.write(chalk.cyan('\n\n-------------------\n'));
        ui.write(chalk.green('All Done. Enjoy :)\n'));
        ui.write(chalk.cyan('-------------------\n'));
      })
      .catch(function(err){
        ui.write(chalk.red('Error setting up project'));
        throw err;
      });
  },
  setupCordova: function() {
    var createProject = require('../tasks/create-cordova-project')(this.config);
    var copyHooks     = require('../tasks/copy-hooks')(this.config);
    var addPlatforms  = require('../tasks/add-platforms')(this.config);
    var updateConfig  = require('../tasks/update-config-xml')(this.config);

    return createProject().then(copyHooks).then(addPlatforms).then(updateConfig);
  },
  setupEmber: function() {
    var createProject      = require('../tasks/create-ember-project')(config);
    var installBowerDeps   = require('../tasks/install-bower-dependencies')(config);
    var installNpmDeps     = require('../tasks/install-npm-dependencies')(config);
    var removeDefaultFiles = require('../tasks/remove-default-ember-cli-files')(config);
    var copyEmberTmpls     = require('../tasks/copy-ember-templates')(config);

    return createProject.then(installBowerDeps).then(installNpmDeps).then(removeDefaultFiles).then(copyEmberTmpls);
  },
  finalizeSetup: function() {
    return new Promise(function(resolve, reject){
      try {
        // TODO: only needed for setup. for all later commands we initialize a project
        // which already has the project root. dirty, should remove this and
        // pass it in as an option to the tasks
        config.delete('projectPath');
        config.flush(); // write config

        // TODO: this is duplication of the path listed in
        // tasks/build. I'd like to remove it
        linkEnv(Project.closest(projectPath), 'ember/tmp/output');

        resolve();
      } catch(e) {
        reject(e);
      }
    });
  }

});
