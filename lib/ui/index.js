'use strict';

var PleasantProgress = require('pleasant-progress');

module.exports = {
  pleasantProgress: new PleasantProgress(),
  start: function(msg) {
    this.pleasantProgress.stop(true);
    this.pleasantProgress.start(msg)
  },
  write: function(msg) {
    this.pleasantProgress.stream.write(msg);
  }
};
