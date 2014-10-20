import redirect from '../utils/redirect';

export var initialize = function(container, app, config) {
  var url = config.cordova.emberUrl || 'http://localhost:4200';
  return redirect(url);
};

export default {
  name: 'cordova:in-app-livereload',
  initialize: initialize
};
