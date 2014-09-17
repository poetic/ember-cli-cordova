import Ember from 'ember';

export default function(app) {
  app.deferReadiness();

  return new Ember.RSVP.Promise(function(resolve) {
    document.addEventListener('deviceready', resolve, false);
  });
}
