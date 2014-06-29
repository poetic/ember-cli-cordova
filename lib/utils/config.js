'use strict';

var fs     = require('fs-extra');
var assign = require('lodash').assign;

function Config(path, config) {
  this.path = path;
  this.config = {};

  if(config == null) {
    config = {};
  }

  if(fs.existsSync(this.path)) {
    assign(this.config, fs.readJsonSync(this.path));
  }
  assign(this.config, config)
  return this;
};

Config.prototype.flush = function() {
  return fs.outputJsonSync(this.path, this.config);
};

Config.prototype.set = function(key, value) {
  return this.config[key] = value;
};

Config.prototype.get = function(key) {
  return this.config[key];
};

Config.prototype.delete = function(key) {
  return delete this.config[key];
};

module.exports = Config;
