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
  description: 'Creates a cordova project with an ember-cli project inside with preinstalled dependencies and files for easy app development. If the git option is supplied it will initialize a git repo and commit the initial setup.',
  commandSuffix: '<app-name> <reverse.style.domain> <options...>',
  optionsHelp: [
    '--directory|-d  (Default: project name)',
    '--git|-g'
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
    this.options.git     = this.options.hasOwnProperty('git') || this.options.hasOwnProperty('g') || false;
  },
  run: function() {
    var projectPath = path.join(process.cwd(), this.options.dirName);
    var configPath  = path.join(projectPath, '.ember-cdv');

    this.config = new Config(configPath, {
      projectPath:  path.join(process.cwd(), this.options.dirName),
      name:         this.args.name,
      id:           this.args.id
    });

    this.setupCordova()
      .then(this.setupEmber.bind(this))
      .then(this.linkEnvironment.bind(this))
      .then(this.initializeGit.bind(this))
      .then(function() {
        ui.write(chalk.cyan('\n\n-------------------\n'));
        ui.write(chalk.green('All Done. Enjoy :)\n'));
        ui.write(chalk.cyan('-------------------\n'));
      })
      .catch(function(err){
        ui.write(chalk.red('\nError thrown while setting up project:\n\n'));
        ui.write(err);
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
    var createProject      = require('../tasks/create-ember-project')(this.config);
    var installBowerDeps   = require('../tasks/install-bower-dependencies')(this.config);
    var installNpmDeps     = require('../tasks/install-npm-dependencies')(this.config);
    var removeDefaultFiles = require('../tasks/remove-default-ember-cli-files')(this.config);
    var copyEmberTmpls     = require('../tasks/copy-ember-templates')(this.config);

    return createProject().then(installBowerDeps).then(installNpmDeps).then(removeDefaultFiles).then(copyEmberTmpls);
  },
  linkEnvironment: function() {
    var self = this;

    return new Promise(function(resolve, reject){
      try {
        var projectPath = self.config.get('projectPath');

        self.config.delete('projectPath');
        // Hack to not write projectPath since I don't need it after project is
        // created
        // It must be written for Project.closest to work below
        self.config.flush();
        self.config.set('projectPath', projectPath)

        // TODO: this is duplication of the path listed in
        // tasks/build. I'd like to remove it
        var link = linkEnv(Project.closest(projectPath), 'ember/tmp/output');

        link().then(resolve, reject);

      } catch(e) {
        reject(e);
      }
    });
  },
  initializeGit: function() {
    if(this.options.git) {
      return require('../tasks/initialize-git')(this.config)();
    }

    return Promise.resolve();
  }

});
