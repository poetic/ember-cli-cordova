import config from '../config/environment';
import downloadInitializer from 'ember-cli-cordova/initializers/download-assets';

var downloadAssets = downloadInitializer.initialize;

export var initialize = function(container, app) {
  if(typeof cordova === 'undefined' ||
      config.environment !== 'production' ||
      config.environment !== 'staging') {
    return;
  }

  return downloadAssets(config.zipDownloadURL, container, app);
};

export default {
  name: 'cordova:download-assets',
  initialize: initialize
};
