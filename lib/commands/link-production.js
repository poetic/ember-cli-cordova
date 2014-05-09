var linkEnv = require('../tasks/link-environment');

module.exports = function(projectPath) {
  if(typeof projectPath === 'string') {
    return linkEnv('ember/dist', projectPath);
  }
  linkEnv('ember/dist');
}

