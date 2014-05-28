'use strict';

var PleasantProgress = require('./internals/pleasant-progress');

module.exports = {
  pleasantProgress: new PleasantProgress(),
  write: function() {
    this.pleasantProgress.stop(true);
    process.stdout.write.apply(process.stdout, arguments)
  }
};
