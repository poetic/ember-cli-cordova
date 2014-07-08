'use strict';

var path        = require('path');
var chalk       = require('chalk');
var Config      = require('../utils/config');
var Promise     = require('../ext/promise');
var stringUtils = require('../utils/string');
var linkEnv     = require('../tasks/link-environment');
var ui          = require('../ui');

module.exports = {
  name: 'cordova:init',
  aliases: ['cdv:init'],
  description: 'Initialize cordova repo',
  works: 'insideProject',

  anonymousOptions: [
    '<com.reverse.style.id>'
  ],

  availableOptions: [
    { name: 'platform', type: String, default: 'ios' }
  ],

  setupEmber: function() {
    var installNpmDeps     = require('../tasks/install-npm-dependencies')(this.project);
    var removeDefaultFiles = require('../tasks/remove-default-ember-cli-files')(this.project);
    var copyEmberTmpls     = require('../tasks/copy-ember-templates')(this.project);
    var updateIndexHtml    = require('../tasks/update-index-html')(this.project);

    return installNpmDeps().then(removeDefaultFiles).then(copyEmberTmpls).then(updateIndexHtml);
  },

  setupCordova: function() {
    var createProject = require('../tasks/create-cordova-project')(this.project);
    var copyHooks     = require('../tasks/copy-hooks')(this.project);
    var addPlatforms  = require('../tasks/add-platforms')(this.project, this.options);
    var updateConfig  = require('../tasks/update-config-xml')(this.project);

    return createProject().then(copyHooks).then(addPlatforms).then(updateConfig);
  },

  linkEnvironment: function() {
    var project = this.project;

    return linkEnv(this.project)();
  },

  run: function(options, rawArgs) {
    this.options = options;
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
