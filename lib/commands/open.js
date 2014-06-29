'use strict';

var path    = require('path');

module.exports = {
  name: 'cdv:open',
  description: 'open the ios project with the default application',
  run: function() {
    return require('../tasks/open')(this.project)();
  }
};
