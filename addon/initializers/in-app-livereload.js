import deferReadiness from '../utils/defer-readiness';
import redirect from '../utils/redirect';
import startProxy from '../utils/start-proxy-server';

export var initialize = function(container, app, config) {
  var url = config.cordova.emberUrl || 'http://localhost:4200';
  return redirect(url);
};

export default {
  name: 'cordova:in-app-livereload',
  initialize: initialize
};
