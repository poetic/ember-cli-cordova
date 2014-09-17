import deferReadiness from '../utils/defer-readiness';
import redirect from '../utils/redirect';
import startProxy from '../utils/start-proxy-server';

export var initialize = function(container, app) {
  return deferReadiness(app).then(function() {
    return startProxy('.').then(function(url) {
      return url.replace('4300', '4200');
    }).then(redirect);

  }).finally(function() {
    app.advanceReadiness();
  });
}

export default {
  name: 'cordova:in-app-livereload',
  initialize: initialize
};
