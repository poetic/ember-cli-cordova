var Promise = require('../../lib/ext/promise');
var stringUtils = require('../../lib/utils/string');

module.exports = {
  // Allows the generator to not require an entity name
  normalizeEntityName: function(entityName) {
    return entityName;
  },

  locals: function(options) {
    var name = options.project.pkg.name;

    return {
      namespace:     stringUtils.classify(name),
      modulePrefix:  stringUtils.dasherize(name)
    }
  },

  afterInstall: function(options) {
    return Promise.all([
      this.addPackageToProject('broccoli-sass'),
      this.addPackageToProject('ember-animated-outlet-mobile'),
    ]);
  }
};
