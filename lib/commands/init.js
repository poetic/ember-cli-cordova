'use strict';

var path   = require('path');
var chalk  = require('chalk');
var Config = require('../utils/config');
var Promise = require('../ext/promise');
var stringUtils = require('../utils/string');
var linkEnv = require('../tasks/link-environment');

module.exports = {
  name: 'cdv:init',
  description: 'Initialize cordova repo',
  works: 'insideProject',

  anonymousOptions: [
    '<com.id>'
  ],

  setupEmber: function() {
    var installBowerDeps   = require('../tasks/install-bower-dependencies')(this.project);
    var installNpmDeps     = require('../tasks/install-npm-dependencies')(this.project);
    var removeDefaultFiles = require('../tasks/remove-default-ember-cli-files')(this.project);
    var copyEmberTmpls     = require('../tasks/copy-ember-templates')(this.project);
    var updateIndexHtml    = require('../tasks/update-index-html')(this.project);

    return installBowerDeps().then(installNpmDeps).then(removeDefaultFiles).then(copyEmberTmpls).then(updateIndexHtml);
  },

  setupCordova: function() {
    var createProject = require('../tasks/create-cordova-project')(this.project);
    var copyHooks     = require('../tasks/copy-hooks')(this.project);
    var addPlatforms  = require('../tasks/add-platforms')(this.project);
    var updateConfig  = require('../tasks/update-config-xml')(this.project);

    return createProject().then(copyHooks).then(addPlatforms).then(updateConfig);
  },

  linkEnvironment: function() {
    var project = this.project;

    return linkEnv(this.project)();
  },

  run: function(options, rawArgs) {
    var configPath = path.join(this.project.root, '.ember-cdv')
    this.project.cdvConfig = new Config(configPath, {
      name:          stringUtils.classify(this.project.name()),
      modulePrefix:  stringUtils.dasherize(this.project.name()),
      id:            rawArgs[0]
    });
    this.project.cdvConfig.flush();

    return this.setupEmber()
      .then(this.setupCordova.bind(this))
      .then(this.linkEnvironment.bind(this))
      .then(function() {
        ui.write(chalk.cyan('\n\n-------------------\n'));
        ui.write(chalk.green('All Done. Enjoy :)\n'));
        ui.write(chalk.cyan('-------------------\n'));
      });
  },
};
