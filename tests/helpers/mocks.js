var noop = require('./noop');

exports.ui = {
  write: noop,
  pleasantProgress: {
    write: noop,
    start: noop,
    stop: noop,
    clear: noop,
  }
}

exports.Promise = {
  denodeify: function(fn) { return fn; }
}
