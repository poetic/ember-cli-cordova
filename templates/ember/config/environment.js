module.exports = function(environment) {
  var ENV = {
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
    }
  };

  if (environment === 'development') {
    // LOG_MODULE_RESOLVER is needed for pre-1.6.0
    ENV.LOG_MODULE_RESOLVER = true;

    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_MODULE_RESOLVER = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.development = true;
    ENV.appEnv      = 'development';
    ENV.nodeApiUrl  = 'http://localhost:3000/api/v1';
    ENV.apiUrl      = 'http://localhost:8080/api/v1';

    ENV.cordova = {
      rebuildOnChange: false,
      rebuildAsync: false,
      emulate: false
    };
  }

  if (environment === 'staging') {
    ENV.staging = true;
    ENV.appEnv  = 'staging';
  }

  if (environment === 'production') {
    ENV.production = true;
    ENV.appEnv     = 'production';
  }

  return ENV;
};
