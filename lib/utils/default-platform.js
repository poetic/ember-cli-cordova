module.exports = function defaultPlatform(project) {
  var config = project.config().cordova || {};
  return config.platform || 'ios';
};
