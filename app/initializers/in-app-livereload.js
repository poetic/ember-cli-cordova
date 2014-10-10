import config from '../config/environment';
import reloadInitializer from 'ember-cli-cordova/initializers/in-app-livereload';

var inAppReload = reloadInitializer.initialize;

export var initialize = function(container, app) {
  if(typeof cordova === 'undefined' ||
      config.environment !== 'development' ||
      (config.cordova && !config.cordova.liveReload)) {
    return;
  }

  return inAppReload(container, app, config);
}

export default {
  name: 'cordova:in-app-livereload',
  initialize: initialize
};
