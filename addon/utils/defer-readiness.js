import Ember from 'ember';

export default function(app) {
  app.deferReadiness();

  return new Ember.RSVP.Promise(function(resolve, reject) {
    document.addEventListener('deviceready', resolve, false);

    Ember.run.later(function() {
      reject(new Error('We are waiting for cordova to be ready but it hasn\'t started after 5 seconds. Usually that\'s because you\'re in the browser. If you need to work in the browser, please start `ember serve` without the proxy.'));
    }, 5000);
  });
}
