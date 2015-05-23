'use strict';

var path = require('path');
var fs = require('fs');
var commands = require('./lib/commands');
var postBuild = require('./lib/tasks/post-build');
var defaults = require('lodash').defaults;
var chalk = require('chalk');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-cordova',

  _isTargetCordova: function () {
    return !process.env.EMBER_CLI_CORDOVA ||
      ['0', 'off', 'false', 'no'].indexOf(process.env.EMBER_CLI_CORDOVA.toLowerCase()) === -1;
  },

  config: function (env, config) {
    var conf = {isCordovaBuild: this._isTargetCordova()};
    if (conf.isCordovaBuild && env !== 'test') {
      if (config.locationType && config.locationType !== 'hash') {
        throw new Error('ember-cli-cordova: You must specify the locationType as \'hash\' in your environment.js or rename it to defaultLocationType.');
      }
      conf.locationType = 'hash';
    }
    else if (!conf.locationType) {
      conf.locationType = config.defaultLocationType || 'auto';
    }
    conf.cordova = defaults(config.cordova || {}, {
      liveReload: {
        enabled:  false,
        platform: 'ios'
      }
    });
    return conf;
  },

  contentFor: function (type) {
    if (this._isTargetCordova() && type === 'body') {
      return '<script src="cordova.js"></script>';
    }
  },

  includedCommands: function () {
    return commands;
  },

  cdvConfig: function () {
    return this.project.config(process.env.EMBER_ENV || 'development').cordova;
  },

  postBuild: function () {
    if (this._isTargetCordova()) {
      return postBuild(this.project, this.cdvConfig())();
    }
    else {
      return function () {
      };
    }
  },

  treeForPublic: function (tree) {
    var config = this.cdvConfig();

    if (this._isTargetCordova() && config.liveReload.enabled) {
      if (!config.liveReload.platform) {
        throw new Error('ember-cli-cordova: You must specify a liveReload.platform in your environment.js');
      }

      var platformsPath = path.join(this.project.root, 'cordova', 'platforms');
      var pluginsPath;

      if (config.liveReload.platform === 'ios') {
        pluginsPath = path.join(platformsPath, 'ios', 'www');
      }
      else if (config.liveReload.platform === 'browser') {
        pluginsPath = path.join(platformsPath, 'browser', 'www');
      }
      else if (config.liveReload.platform === 'android') {
        pluginsPath = path.join(platformsPath, 'android', 'assets', 'www');
      }
      else {
        pluginsPath = path.join(platformsPath, config.liveReload.platform);
      }

      var files = ['cordova.js', 'cordova_plugins.js'];

      files.forEach(function (file) {
        var filePath = path.join(pluginsPath, file);
        if (!fs.existsSync(filePath)) {
          var err = new Error('ember-cli-cordova: ' + filePath + ' did not exist. It is required for Device LiveReload to work.');
          err.stack = null;
          throw err;
        }
      });

      if (fs.existsSync(path.join(pluginsPath, 'plugins'))) {
        files.push('plugins/**');
      }

      var pluginsTree = new Funnel(this.treeGenerator(pluginsPath), {
        srcDir:  '/',
        include: files,
        destDir: '/'
      });

      console.log(chalk.green('ember-cli-cordova: Device LiveReload is enabled'));

      return mergeTrees([tree, pluginsTree]);
    }

    return tree;
  }
};
