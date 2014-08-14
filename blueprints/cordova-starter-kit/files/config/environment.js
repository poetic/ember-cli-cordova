/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    cordova: {
      rebuildOnChange: false,
      rebuildAsync: false,
      emulate: false
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.apiUrl = 'http://localhost:3000/api/v1';
    ENV.development = true;
  }

  if (environment === 'test') {

  }

  if (environment === 'staging') {
    ENV.apiUrl = 'http://<%= modulePrefix %>-staging.herokuapp.com/api/v1';
    ENV.staging = true;
  }


  if (environment === 'production') {
    ENV.apiUrl = 'http://<%= modulePrefix %>.herokuapp.com/api/v1';
    ENV.production = true;
  }

  return ENV;
};
