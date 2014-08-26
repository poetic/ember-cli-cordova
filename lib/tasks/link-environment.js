'use strict';

var Promise    = require('../ext/promise');
var fs         = require('fs-extra');
var symlink    = Promise.denodeify(fs.symlink);
var remove     = Promise.denodeify(fs.remove);
var path       = require('path');
var chalk      = require('chalk');
var verifyDist = require('./verify-dist');

module.exports = function(project){
  if(!project) {
    throw new Error('A project must be passed into this function');
  }

  var cordovaPath = path.join(project.root, 'cordova');
  var wwwPath     = path.join(cordovaPath, 'www');

  return function() {
    // allows us to do a relative symlink
    process.chdir(cordovaPath);

    return remove(wwwPath)
            .then(symlink.bind(this, '../dist', 'www', 'dir'))
            .then(verifyDist(project));
  };
};

