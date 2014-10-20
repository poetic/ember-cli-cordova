'use strict';

var path      = require('path');
var commands  = require('./lib/commands');
var postBuild = require('./lib/tasks/post-build');
var defaults  = require('lodash').defaults;
var chalk     = require('chalk');

module.exports = {
  name: 'ember-cli-cordova',

  contentFor: function(type) {
    if(type === 'body') {
      return '<script src="cordova.js"></script>';
    }
  },

  includedCommands: function() {
    return commands;
  },

  cdvConfig: function() {
    var cdvConfig = defaults(this.project.config('development').cordova || {}, {
      liveReload: {
        enabled: false,
        platform: 'ios'
      }
    });

    return cdvConfig;
  },

  postBuild: function() {
    return postBuild(this.project, this.cdvConfig())();
  },

  treeForPublic: function(tree) {
    var config = this.cdvConfig();

    if(config.liveReload.enabled) {
      if(!config.liveReload.platform) {
        throw new Error('ember-cli-cordova: You must specify a liveReload.platform in your environment.js');
      }

      var platformsPath = path.join(this.project.root, 'cordova', 'platforms');
      var pluginsPath;

      if (config.liveReload.platform === 'ios') {
        pluginsPath = path.join(platformsPath, 'ios', 'www');
      } else if (config.liveReload.platform === 'android') {
        pluginsPath = path.join(platformsPath, 'android', 'assets', 'www');
      } else {
        pluginsPath = path.join(platformsPath, config.liveReload.platform);
      }

      var pluginsTree = this.pickFiles(this.treeGenerator(pluginsPath), {
        srcDir: '/',
        files: ['cordova.js', 'cordova_plugins.js', 'plugins/*'],
        destDir: '/'
      });

      console.log(chalk.green('Device LiveReload is enabled'));
      console.log(chalk.yellow('Your app will only boot in the simulator or on a device - https://github.com/poetic/ember-cli-cordova#configuration'));
      return this.mergeTrees([tree, pluginsTree]);
    }

    return tree;
  }
};
