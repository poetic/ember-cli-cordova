var projectWithConfig = require('../../lib/models/project-with-config');
var Promise           = require('../../lib/ext/promise');

module.exports = {
  afterInstall: function(options) {
    this.options = options.entity.options;
    this.options.platform = this.options.platform || 'ios';

    projectWithConfig(this.project, options.entity.name);

    return this.setupCordova();
  },

  setupCordova: function() {
    var createProject   = require('../../lib/tasks/create-cordova-project')(this.project);
    var addPlatforms    = require('../../lib/tasks/add-platforms')(this.project, this.options);
    var updateConfig    = require('../../lib/tasks/update-config-xml')(this.project);
    var linkEnvironment = require('../../lib/tasks/link-environment')(this.project);

    return createProject().then(addPlatforms).then(updateConfig).then(linkEnvironment);
  }
};
