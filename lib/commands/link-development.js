var linkEnv = require('../tasks/link-environment');

module.exports = function() {
  linkEnv('ember/tmp/output');
}

