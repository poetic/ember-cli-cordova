import deferReadiness from '../utils/defer-readiness';
import redirect from '../utils/redirect';
import downloadAssets from '../utils/download-assets';
import startProxy from '../utils/start-proxy-server';

export var initialize = function(url, container, app) {
  return deferReadiness(app).then(function() {
    downloadAssets(url).then(startProxy, function(err) {
      return startProxy('.');
    }).then(redirect);

  }).finally(function() {
    app.advanceReadiness();
  });
};

export default {
  name: 'cordova:download-assets',
  initialize: initialize
};
